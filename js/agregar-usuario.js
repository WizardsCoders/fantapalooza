const URL = "https://nakisey.pythonanywhere.com/"
//Al subir al servidor, deberá utilizarse la siguiente ruta.
//USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/"

// Capturamos el evento de envío del formulario
document.getElementById('formulario').addEventListener('submit',function (event) {
    event.preventDefault(); // Evitamos que se envie el form
    var formData = new FormData(this);
    
    // Realizamos la solicitud POST al servidor
    fetch(URL + 'usuarios', {
        method: 'POST',
        body: formData // Aquí enviamos formData. Dado que formData puede contener archivos, no se utiliza JSON.
    })

    //Después de realizar la solicitud POST, se utiliza el método then() para manejar la respuesta del servidor.
    .then(function (response) {
        if (response.ok) {
    //Si la respuesta es exitosa, convierte los datos de la respuesta a formato JSON.
            return response.json();
        } else {
    // Si hubo un error, lanza explícitamente una excepción para ser "catcheada" más adelante
            throw new Error('Error al agregar el usuario.');
        }
    })
    
    //Respuesta OK, muestra una alerta informando que el
    //Usuario se agregó correctamente y limpia los campos del formulario para
    //que puedan ser utilizados para un nuevo Usuario.
    .then(function (data) {
    alert('Usuario agregado correctamente.');
    })

    // En caso de error, mostramos una alerta con un mensaje de error.
    .catch(function (error) {
    alert('Error al agregar el Usuario.');
    })

    // Limpiar el formulario en ambos casos (éxito o error)
    .finally(function () {
    document.getElementById('nombre').value = "";
    document.getElementById('apellido').value = "";
    document.getElementById('usuario').value = "";
    document.getElementById('contrasenia').value = "";
    document.getElementById('imagenUsuario').value = "";
    });
})