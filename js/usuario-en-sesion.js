let usuario = localStorage.getItem("usuario")   // Me guardo en una variable lo que haya como usuario en el local storage
  document.addEventListener("DOMContentLoaded", function () {   // Creo un evento de escucha cuando se este cargando la pagina
    if (usuario) {                        //Si existe un usuario en "sesion"
      document.getElementById("menu-iniciar-sesion").style.display = "none";   //Desactivo el campo "iniciar sesion"
      document.getElementById("menu-desplegable").style.display = "inline";   // Activo el menú para usuario en sesión
      document.getElementById("usuario-actual").textContent = usuario.toUpperCase() + " +"; // Inyecto el nombre de usuario
    }
  });


// Al presionar el botón salir elimina del local storage lo que haya como usuario y recarga la página para que otro usuario pueda iniciar sesion
function eliminar_ls(){
  document.getElementById('usuario-actual').value = ''
  localStorage.removeItem("usuario") 
  alert('¡Gracias vuelvas prontos!')
  location.reload()
}

