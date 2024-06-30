const URL = "http://127.0.0.1:5000/"
// Al subir al servidor, deberá utilizarse la siguiente ruta.
//USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/"

// Realizamos la solicitud GET al servidor para obtener todos los usuarios.
fetch(URL + 'usuarios')
    .then(function (response) {
        if (response.ok) {
        //Si la respuesta es exitosa (response.ok), convierte
        //el cuerpo de la respuesta de formato JSON a un objeto JavaScript y pasa
        //estos datos a la siguiente promesa then.
        return response.json();
        } else {
        // Si hubo un error, lanzar explícitamente una excepción para ser "catcheada" más adelante
        throw new Error('Error al obtener los usuarios.');
        }
    })

    //Esta función maneja los datos convertidos del JSON.
    .then(function (data) {
        let tablaUsuarios = document.getElementById('tablaUsuarios'); 
        //Selecciona el elemento del DOM donde se mostrarán los usuarios.
        
        // Iteramos sobre cada usuario y agregamos filas a la tabla
        for (let usuario of data) {
            let fila = document.createElement('tr'); //Crea una nueva fila de tabla (<tr>) para cada usuario.

            fila.innerHTML = '<td>' + usuario.codigo + '</td>' +
            '<td>' + usuario.nombre + '</td>' +
            '<td>' + usuario.apellido + '</td>' +
            '<td>' + usuario.usuario + '</td>' +
            '<td>' + usuario.contrasenia + '</td>' +

            // Mostrar miniatura de la imagen (probar ruta)
            '<td><img src=/multimedia/' + usuario.imagen_url +' alt="Imagen del usuario" width="80" height="80"></td>';
            //Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
            //'<td><img src=https://www.pythonanywhere.com/user/USUARIO/files/home/USUARIO/mysite/static/imagenes/' + usuario.imagen_url +' alt="Imagen del usuario" style="width: 100px;"></td>';

            //Una vez que se crea la fila con el contenido del
            //producto, se agrega a la tabla utilizando el método appendChild del
            //elemento tablaProductos.
            tablaUsuarios.appendChild(fila);
        }
    })

    //Captura y maneja errores, mostrando una alerta en caso de error al obtener los productos.
    .catch(function (error) {
        // Código para manejar errores
        alert('Error al obtener los usuarios.');
    });