import mysql.connector
class Usuario:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.conn.cursor(dictionary=True)
        self.cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios (
            codigo INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            apellido VARCHAR(255) NOT NULL,
            usuario VARCHAR(255) NOT NULL,
            imagen_url VARCHAR(255) )''')
        self.conn.commit()

    def agregar_usuario(self, nombre, apellido, nombre_usuario, imagen):

        sql = "INSERT INTO usuarios (nombre, apellido, usuario, imagen_url) VALUES (%s, %s, %s, %s)"
        valores = (nombre, apellido, nombre_usuario, imagen)

        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.lastrowid

    def consultar_usuario(self, codigo):
        # Consultamos un usuario a partir de su código
        self.cursor.execute(f"SELECT * FROM usuarios WHERE codigo = {codigo}")
        return self.cursor.fetchone()

    #no tiene mucho sentido en nuestro caso pero bueno
    def modificar_usuario(self, codigo, nuevo_nombre, nuevo_apellido, nuevo_nombre_usuario, nueva_imagen):
        sql = "UPDATE usuarios SET nombre = %s, apellido = %s, usuario = %s, imagen_url = %s WHERE codigo = %s"
        valores = (nuevo_nombre, nuevo_apellido, nuevo_nombre_usuario, nueva_imagen, codigo)
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
            print(f"Imagen.....: {usuario['imagen_url']}")        
            print("-" * 40)
        else:
            print("Usuario no encontrado.")

    def listar_usuarios(self):
        self.cursor.execute("SELECT * FROM usuarios")
        usuarios = self.cursor.fetchall()
        return usuarios
    
    def eliminar_usuario(self, codigo):
        # Eliminamos un producto de la tabla a partir de su código
        self.cursor.execute(f"DELETE FROM usuarios WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

#main
usuarios = Usuario(host='localhost', user='root', password='', database='miapp')
'''
usuarios.agregar_usuario("Juan","Perez","pepito", "1.png") 
usuarios.agregar_usuario("Jose","Sosa", "josesito", "2.png")
'''

'''
#ejemplo consulta
cod_usuario = int(input("Ingrese el código del usuario: "))
usuario = usuarios.consultar_usuario(cod_usuario)
if usuario:
    print(f"Usuario encontrado: {usuario['codigo']} - {usuario['usuario']}")
else:
    print(f'Usuario {cod_usuario} no encontrado.')

usuarios.mostrar_usuario(1)
usuarios.modificar_usuario(1,"Juancito","Perez", "pepito123", "1.png")
usuarios.mostrar_usuario(1)

print(usuarios.eliminar_usuario(1))
usuarios.listar_usuarios()
'''
lista_usuarios = usuarios.listar_usuarios()
for usuario in lista_usuarios:
    print(usuario)

usuarios.agregar_usuario("Alvaro","Escobedo", "alvarito", "3.png")

print("-----------")

lista_usuarios = usuarios.listar_usuarios()
for usuario in lista_usuarios:
    print(usuario)