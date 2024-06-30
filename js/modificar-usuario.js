const URL = "https://nakisey.pythonanywhere.com/"
// Al subir al servidor, deberá utilizarse la siguiente ruta.
//USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/"

// Variables de estado para controlar la visibilidad y los datos del formulario
let codigo = '';
let nombre = '';
let apellido = '';
let usuario = '';
let contrasenia = '';
let imagen_url = '';
let imagenSeleccionada = null;
let imagenUrlTemp = null;
let mostrarDatosUsuario = false;

document.getElementById('form-obtener-usuario').addEventListener('submit', obtenerUsuario);

document.getElementById('form-guardar-cambios').addEventListener('submit', guardarCambios);

document.getElementById('nuevaImagen').addEventListener('change', seleccionarImagen);

// Se ejecuta cuando se envía el formulario de consulta. Realiza
//una solicitud GET a la API y obtiene los datos del Usuario correspondiente al código ingresado.
function obtenerUsuario(event) {
    event.preventDefault();
    codigo = document.getElementById('codigo').value;
    fetch(URL + 'usuarios/' + codigo)
        .then(response => {
            if (response.ok) {
            return response.json()
            } else {
            throw new Error('Error al obtener los datos del Usuario.')
            }
        })
        .then(data => {
            nombre = data.nombre;
            apellido = data.apellido;
            usuario = data.usuario;
            contrasenia = data.contrasenia;
            imagen_url = data.imagen_url;
            mostrarDatosUsuario = true; //Activa la vista del segundo formulario

            mostrarFormulario();
        })
        .catch(error => {
        alert('Código no encontrado.');
        });
}

// Muestra el formulario con los datos del Usuario
function mostrarFormulario() {
    if (mostrarDatosUsuario) {
        document.getElementById('nombreModificar').value = nombre;
        document.getElementById('apellidoModificar').value = apellido;
        document.getElementById('usuarioModificar').value = usuario;
        document.getElementById('contraseniaModificar').value = contrasenia;

        const imagenActual = document.getElementById('imagen-actual');

        if (imagen_url && !imagenSeleccionada) { // Verifica si imagen_url no está vacía y no se ha seleccionado una imagen
            imagenActual.src = 'https://www.pythonanywhere.com/user/nakisey/files/home/nakisey/mysite/static/imagenes/' + imagen_url;

            //Al subir al servidor, deberá utilizarse la siguiente ruta. 
            //USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
            //imagenActual.src =
            //'https://www.pythonanywhere.com/user/USUARIO/files/home/USUARIO/mysite/static/imagenes/' + imagen_url;

            imagenActual.style.display = 'block'; // Muestra la imagen actual

        } else {
            imagenActual.style.display = 'none'; // Oculta la imagen si no hay URL
        }
        document.getElementById('datos-usuario').style.display = 'block';

    } else {
    document.getElementById('datos-usuario').style.display = 'none';
    }
}

// Se activa cuando el usuario selecciona una imagen para cargar.
function seleccionarImagen(event) {
    const file = event.target.files[0];
    imagenSeleccionada = file;
    imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa

    const imagenVistaPrevia = document.getElementById('imagen-vista-previa');

    imagenVistaPrevia.src = imagenUrlTemp;
    imagenVistaPrevia.style.display = 'block';
}

// Se usa para enviar los datos modificados del Usuario al servidor.
function guardarCambios(event) {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append('codigo', codigo);
    formData.append('nombre',document.getElementById('nombreModificar').value);
    formData.append('apellido',document.getElementById('apellidoModificar').value);
    formData.append('usuario',document.getElementById('usuarioModificar').value);
    formData.append('contrasenia',document.getElementById('contraseniaModificar').value);
        
    // Si se ha seleccionado una imagen nueva, la añade al formData.       
    if (imagenSeleccionada) {
        formData.append('imagen', imagenSeleccionada,imagenSeleccionada.name);       
    }

    fetch(URL + 'usuarios/' + codigo, {
        method: 'PUT',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
            return response.json()
            } else {
            throw new Error('Error al guardar los cambios del Usuario.')
            }
        })
        .then(data => {
            alert('Usuario actualizado correctamente.');
            limpiarFormulario();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar el Usuario.');
        });
}
       
// Restablece todas las variables relacionadas con el formulario
//a sus valores iniciales, lo que efectivamente "limpia" el formulario.
function limpiarFormulario() {
    document.getElementById('codigo').value = '';
    document.getElementById('nombreModificar').value = '';
    document.getElementById('apellidoModificar').value = '';
    document.getElementById('usuarioModificar').value = '';
    document.getElementById('contraseniaModificar').value = '';
    document.getElementById('nuevaImagen').value = '';
    
    const imagenActual = document.getElementById('imagen-actual');
    
    imagenActual.style.display = 'none';
    const imagenVistaPrevia = document.getElementById('imagen-vista-previa');
        
    imagenVistaPrevia.style.display = 'none';
    codigo = '';
    nombre = '';
    apellido = '';
    usuario = '';
    contrasenia = '';
    imagen_url = '';
    imagenSeleccionada = null;
    imagenUrlTemp = null;
    mostrarDatosUsuario = false;
    document.getElementById('datos-Usuario').style.display = 'none';
}