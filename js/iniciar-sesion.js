let formulario = document.getElementById("formulario-ingresar"); // Me guardo el formmulario de ingreso en una variable
formulario.addEventListener("submit", function (event) { // Queda a la espera del boton submit del formulario
    event.preventDefault();                             // Si algo no está bien cancela la ejecución del envío del formulario
    let nombreUsuario = document.getElementById("nombre-usuario").value; // Obtengo el valor del campo usuario
    let contraseña = document.getElementById("contraseña").value; // Obtengo el valor del campo contraseña
    if (nombreUsuario && contraseña == "usuario") {   // Compruebo que se haya escrito algo en usuario y también que la contraseña que me llegue sea = a la palabra usuario
      localStorage.setItem("nombre-usuario", nombreUsuario)  //Guardo en el local storage lo que me haya llegado como nombre de usuario
      localStorage.setItem("dinero", "0")   // Agrego una llave valor en el local storage que represente el dinero inicial en $0
      let url = "index.html";      // Me guardo en una variable la ruta hacia el index
      window.location.href = url;     // Redirecciono hacia el index
    } else {
      prompt("usuario y/o contraseña no válido");
    }
  });