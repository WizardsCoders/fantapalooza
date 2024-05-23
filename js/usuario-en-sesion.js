let dineroEnStorage = parseInt(localStorage.getItem("dinero"))
let usuario = {
  nombreUsuario: localStorage.getItem("nombre-usuario"),
  dinero: dineroEnStorage
};

document.addEventListener("DOMContentLoaded", function () {   // Creo un evento de escucha cuando se este cargando la pagina
    if (usuario.nombreUsuario) {                       //Si existe un usuario en "sesion"
       // Sincronizo el local storage al dinero del usuario
      document.getElementById("menu-iniciar-sesion").style.display = "none";   //Desactivo el campo "iniciar sesion"
      document.getElementById("menu-desplegable").style.display = "inline";   // Activo el menú para usuario en sesión
      document.getElementById("usuario-actual").textContent = usuario.nombreUsuario.toUpperCase() + " ▼";   // Inyecto el nombre de usuario
      document.getElementById("dinero-actual").textContent = `Dinero: $${usuario.dinero}` 
    }
  });

  function agregarDinero() {
    let ingreso = parseInt(prompt("¿Cuanto dinero quiere agregar?:"));
    let dineroEnStorage = parseInt(localStorage.getItem("dinero"));
    let total = ingreso + dineroEnStorage;
    if(total < 1000000) {
      localStorage.setItem("dinero", total);
      location.reload();
    } else {
      alert("No puedes tener más de 1 millón de pesos en tu cuenta")
    }
  }

  function retirarDinero() {
    let retiro = parseInt(prompt("¿Cuanto dinero quiere retirar de su saldo?:"));
    let dineroEnStorage = parseInt(localStorage.getItem("dinero"));
    let total = dineroEnStorage - retiro;
    if(total >= 0) {
      localStorage.setItem("dinero", total);
      location.reload();
    } else {
      alert("No puedes no dispones de dinero suficiente en tu cuenta")
    }
  }

// Al presionar el botón salir elimina del local storage lo que haya como usuario y recarga la página para que otro usuario pueda iniciar sesion
function eliminar_ls(){
  document.getElementById('usuario-actual').value = ''
  document.getElementById('dinero-actual').value = ''
  localStorage.removeItem("nombre-usuario") 
  localStorage.removeItem("dinero")
  alert('¡Gracias vuelvas prontos!')
  location.reload()
}

