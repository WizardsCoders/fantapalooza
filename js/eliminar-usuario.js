const URL = "https://nakisey.pythonanywhere.com/"
// Obtiene el contenido del inventario
function obtenerUsuarios() {
    fetch(URL + 'usuarios') // Realiza una solicitud GET al servidor y obtiene la lista de Usuarios.
    .then(response => {
    // Si es exitosa (response.ok), convierte los datos de la respuesta de formato JSON a un objeto JavaScript.
        if (response.ok) { return response.json(); }
    })
    // Asigna los datos de los Usuarios obtenidos a la propiedad Usuarios del estado.
    .then(data => {
        const usuariosTable = document.getElementById('usuarios-table').getElementsByTagName('tbody')[0];

        usuariosTable.innerHTML = ''; // Limpia la tabla antes de insertar nuevos datos

        data.forEach(usuario => {
            const row = usuariosTable.insertRow();
            row.innerHTML = `
            <td>${usuario.codigo}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.usuario}</td>
            <td><buttononclick="eliminarUsuario('${usuario.codigo}')">Eliminar</button></td>
            `;
        });
    })
    // Captura y maneja errores, mostrando una alerta en caso de error al obtener los Usuarios.
    .catch(error => {
        console.log('Error:', error);
        alert('Error al obtener los Usuarios.');
    });
}

// Se utiliza para eliminar un Usuario.
function eliminarUsuario(codigo) {
    // Se muestra un diálogo de confirmación. Si el usuario confirma, se realiza una solicitud DELETE al servidor a través de
    // fetch(URL + 'usuarios/${codigo}', {method: 'DELETE' }).
    if (confirm('¿Estás seguro de que quieres eliminar este Usuario?')) {
        fetch(URL + `usuarios/${codigo}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                // Si es exitosa (response.ok), elimina el Usuario y da mensaje de ok.

                obtenerUsuarios(); // Vuelve a obtener la lista de Usuarios para actualizar la tabla.

                alert('Usuario eliminado correctamente.');
            }
        })
        // En caso de error, mostramos una alerta con un mensaje de error.
        .catch(error => {
            alert(error.message);
        });
    }
}
// Cuando la página se carga, llama a obtenerUsuarios para cargar la lista de Usuarios.
document.addEventListener('DOMContentLoaded', obtenerUsuarios);