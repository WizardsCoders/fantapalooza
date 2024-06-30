function validarFormulario(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let nombreUsuario = document.getElementById("usuario").value;
    let contrasenia = document.getElementById("contrasenia").value;
    var archivoInput = document.getElementById("imagenUsuario");
    var archivo = archivoInput.files[0];
    // let telefono = document.getElementById("telefono").value;
    // let fnac = document.getElementById("fecha").value;
    // let mail = document.getElementById("mail").value;
    // var opciones = document.getElementsByName("opcion");
    // var seleccionado = false;


    if(nombre == ""){
        alert("Ingrese su nombre")
        return false;
    }

    if(apellido == ""){
        alert("Ingrese su apellido")
        return false;
    }

    if(nombreUsuario == ""){
        alert("Ingrese su nombre de usuario")
        return false;
    }

    if(contrasenia == ""){
        alert("Ingrese su contraseña")
        return false;
    }

    if (!archivo) {
        alert("Seleccione un archivo");
        return false;
    }

    // Verificar si el archivo es una imagen
    if (!archivo.type.startsWith("image/")) {
        alert("Seleccione un archivo de imagen");
        return false;
    }

    // if(telefono == ""){
    //     alert("Ingrese su telefono")
    //     return false;
    // }

    // if(!fnac){
    //     alert("Agregue su fecha de nacimiento")
    //     return false;
    // }

    // if(mail == ""){
    //     alert("Ingrese su mail")
    //     return false;
    // }

    // //validacion adicional del formato
    // var emailRegExp = /^\S+@\S+\.\S+$/;
    // if (!emailRegExp.test(email)) {
    //     alert("Ingrese un correo electrónico válido");
    //     return false;
    // }

    // for (var i = 0; i < opciones.length; i++) {
    //     console.log("verificando" + i);
    //     if (opciones[i].checked) {
    //         seleccionado = true;
    //         console.log("checkeado");
    //         break;
    //     }
    // }

    // if (!seleccionado) {
    //     alert("Seleccione una opción");
    //     return false;
    // }

    return true;
}

function enviarFormulario(){};