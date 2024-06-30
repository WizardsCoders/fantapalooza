let usuario = {
  nombreUsuario: localStorage.getItem("nombre-usuario"),
};

document.addEventListener("DOMContentLoaded", function () {   // Creo un evento de escucha cuando se este cargando la pagina
    if (usuario.nombreUsuario) {                       //Si existe un usuario en "sesion"
       // Sincronizo el local storage al dinero del usuario
      document.getElementById("menu-iniciar-sesion").style.display = "none";   //Desactivo el campo "iniciar sesion"
      document.getElementById("menu-desplegable").style.display = "inline";   // Activo el menú para usuario en sesión
      document.getElementById("usuario-actual").textContent = usuario.nombreUsuario.toUpperCase() + " ▼";   // Inyecto el nombre de usuario 
    }
  });

// Al presionar el botón salir elimina del local storage lo que haya como usuario y recarga la página para que otro usuario pueda iniciar sesion
function eliminar_ls(){
  document.getElementById('usuario-actual').value = ''
  localStorage.removeItem("nombre-usuario") 
  alert('¡Gracias vuelvas prontos!')
  location.reload()
}

