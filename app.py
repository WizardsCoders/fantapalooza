from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time

app = Flask(__name__)
CORS(app)

class Usuario:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )

        self.cursor = self.conn.cursor()

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database}")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE {database}")
                self.conn.database = database
            else:
                raise err
            
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios (
            codigo INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(30) NOT NULL,
            apellido VARCHAR(30) NOT NULL,
            usuario VARCHAR(30) NOT NULL,
            contrasenia VARCHAR(30) NOT NULL,
            imagen_url VARCHAR(255) )''')
        self.conn.commit()

        self.cursor.close()
        self.cursor = self.conn.cursor(dictionary=True)

    def agregar_usuario(self, nombre, apellido, nombre_usuario, contrasenia, imagen):

        sql = "INSERT INTO usuarios (nombre, apellido, usuario, contrasenia, imagen_url) VALUES (%s, %s, %s, %s, %s)"
        valores = (nombre, apellido, nombre_usuario, contrasenia, imagen)

        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.lastrowid

    def consultar_usuario(self, codigo):
        # Consultamos un usuario a partir de su código
        self.cursor.execute(f"SELECT * FROM usuarios WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    #no tiene mucho sentido en nuestro caso pero bueno
    def modificar_usuario(self, codigo, nuevo_nombre, nuevo_apellido, nuevo_nombre_usuario, nueva_contrasenia, nueva_imagen):
        sql = "UPDATE usuarios SET nombre = %s, apellido = %s, usuario = %s, contrasenia = %s, imagen_url = %s WHERE codigo = %s"
        valores = (nuevo_nombre, nuevo_apellido, nuevo_nombre_usuario, nueva_contrasenia, nueva_imagen, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0      

    def mostrar_usuario(self, codigo):
        #se muestra los datos de un usuario a partir de su código
        usuario = self.consultar_usuario(codigo)
        if usuario:
            print("-" * 40)
            print(f"Código.....: {usuario['codigo']}")
            print(f"Nombre.....: {usuario['nombre']}")
            print(f"Apellido...: {usuario['apellido']}")
            print(f"Usuario....: {usuario['usuario']}")
            print(f"Contrasenia: {usuario['contrasenia']}")
            print(f"Imagen.....: {usuario['imagen_url']}")        
            print("-" * 40)
        else:
            print("Usuario no encontrado.")

    def listar_usuarios(self):
        self.cursor.execute("SELECT * FROM usuarios")
        usuarios = self.cursor.fetchall()
        return usuarios
    
    def eliminar_usuario(self, codigo):
        # Eliminamos un usuario de la tabla a partir de su código
        self.cursor.execute(f"DELETE FROM usuarios WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0
    
#main
usuarios = Usuario(host='nakisey.mysql.pythonanywhere-services.com', user='nakisey', password='fantapalooza', database='nakisey$miapp')
#usuaruios = Usuario(host='USUARIO.mysql.pythonanywhere-services.com',
#user='USUARIO', password='CLAVE', database='USUARIO$miapp')

# Carpeta para guardar las imagenes
ruta_destino = '/home/nakisey/mysite/static/imagenes/'
#Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe
#ser reemplazado por el nombre de usuario de Pythonanywhere
#ruta_destino = '/home/USUARIO/mysite/static/imagenes/'

@app.route("/usuarios", methods=["GET"])
def listar_usuarios():
    listaUsuarios = usuarios.listar_usuarios()
    return jsonify(listaUsuarios)

@app.route("/usuarios/<int:codigo>", methods=["GET"])
def mostrar_usuario(codigo):
    usuario = usuarios.consultar_usuario(codigo)
    if usuario:
        return jsonify(usuario), 201
    else:
        return "Usuario no encontrado.", 404
    
@app.route("/usuarios", methods=["POST"])
def agregar_usuario():
    #Recojo los datos del form
    nombre = request.form['nombre']
    apellido = request.form['apellido']
    usuario = request.form['usuario']
    contrasenia = request.form['contrasenia']
    imagen = request.files['imagenUsuario']
    nombre_imagen = ""

    # Genero el nombre de la imagen
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    nuevo_codigo = usuarios.agregar_usuario(nombre, apellido, usuario, contrasenia, nombre_imagen)

    if nuevo_codigo:
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        return jsonify({"mensaje": "Usuario registrado correctamente.","codigo": nuevo_codigo, "imagen": nombre_imagen}), 201
    else:
        return jsonify({"mensaje": "Error al registrar el usuario."}), 500

@app.route("/usuarios/<int:codigo>", methods=["PUT"])
def modificar_usuario(codigo):
    #Se recuperan los nuevos datos del formulario
    nuevo_nombre = request.form.get("nombre")
    nuevo_apellido = request.form.get("apellido")
    nuevo_usuario = request.form.get("usuario")
    nueva_contrasenia = request.form.get("contrasenia")

    # Verifica si se proporcionó una nueva imagen
    if 'imagen' in request.files:
        imagen = request.files['imagenUsuario']
        
        # Procesamiento de la imagen
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
        
        # Guardar la imagen en el servidor
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
        
        # Busco el usuario guardado
        usuario = usuarios.consultar_usuario(codigo)

        if usuario: # Si existe el usuario...
            imagen_vieja = usuario["imagen_url"]
            # Armo la ruta a la imagen
            ruta_imagen = os.path.join(ruta_destino, imagen_vieja)
            
            # Y si existe la borro.
            if os.path.exists(ruta_imagen): os.remove(ruta_imagen)
    else:
        usuario = usuarios.consultar_usuario(codigo)
        if usuario:
            nombre_imagen = usuario["imagen_url"]

    # Se llama al método modificar_usuario pasando el codigo del usuario y los nuevos datos.
    if usuarios.modificar_usuario(codigo, nuevo_nombre,
    nuevo_apellido, nuevo_usuario, nueva_contrasenia, nombre_imagen):
        return jsonify({"mensaje": "usuario modificado"}), 200
    else:
        return jsonify({"mensaje": "usuario no encontrado"}), 403
    
@app.route("/usuarios/<int:codigo>", methods=["DELETE"])
def eliminar_usuario(codigo):
    # Primero, obtiene la información del usuario para encontrar la imagen
    usuario = usuarios.consultar_usuario(codigo)
    if usuario:
        # Eliminar la imagen asociada si existe
        ruta_imagen = os.path.join(ruta_destino, usuario['imagen_url'])
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)

        # Luego, elimina el usuario de los usuarios
        if usuarios.eliminar_usuario(codigo):
            return jsonify({"mensaje": "usuario eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el usuario"}),500
    else:
        return jsonify({"mensaje": "usuario no encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)
