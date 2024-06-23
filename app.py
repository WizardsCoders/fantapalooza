class Usuario:
    usuarios = []

    def agregar_usuario(self, codigo, nombre, apellido, documento, nombre_usuario, imagen):
        if(self.consultar_usuario(codigo)):
            return False
    
        nuevo_usuario = {
            'codigo': codigo,
            'nombre': nombre,
            'apellido': apellido,
            'documento': documento,
            'nombre_usuario': nombre_usuario,
            'imagen': imagen
        }

        self.usuarios.append(nuevo_usuario)
        return True

    def consultar_usuario(self, codigo):
        encontrado = False
        i=0
        while(encontrado == False and i<len(self.usuarios)):
            if(codigo == self.usuarios[i]['codigo']):
                encontrado = True
            
            i+=1
        return encontrado

    #no tiene mucho sentido en nuestro caso pero bueno
    def modificar_usuario(self, codigo, nuevo_nombre, nuevo_apellido, nuevo_documento, nuevo_nombre_usuario, nueva_imagen):
        for usuario in self.usuarios:
            if usuario['codigo'] == codigo:
                usuario['nombre'] = nuevo_nombre
                usuario['apellido'] = nuevo_apellido
                usuario['documento'] = nuevo_documento
                usuario['nombre_usuario'] = nuevo_nombre_usuario
                usuario['imagen'] = nueva_imagen
                return True
        return False

    def listar_usuarios(self):
        print("-" * 50)
        for usuario in self.usuarios:
            print(f"Código.....: {usuario['codigo']}")
            print(f"Nombre.....: {usuario['nombre']}")
            print(f"Apellido...: {usuario['apellido']}")
            print(f"Documento..: {usuario['documento']}")
            print(f"Usuario....: {usuario['nombre_usuario']}")
            print(f"Imagen.....: {usuario['imagen']}")        
            print("-" * 50)

    def eliminar_usuario(self, codigo):
        for usuario in self.usuarios:
            if(usuario['codigo'] == codigo):
                self.usuarios.remove(usuario)
                return True
        return False


#main
usuarios = Usuario()
usuarios.agregar_usuario(1,"asd","ger",2345,"pepito", "g1.png") 
usuarios.agregar_usuario(2,"asd2","ger2",122345,"pepitoG", "g2.png")
print(usuarios.consultar_usuario(0))
print(usuarios.consultar_usuario(1))
usuarios.listar_usuarios()
"""
modificar_usuario(1,"asd","gerson",2345,"pepito", "ger.png")
listar_usuarios()
"""
print(usuarios.eliminar_usuario(1))
usuarios.listar_usuarios()