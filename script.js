var fechaActual = new Date();

var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso se suma 1
var anio = fechaActual.getFullYear();

// Asegurarse de que los valores de día y mes tengan siempre dos dígitos
if (dia < 10) {
  dia = "0" + dia;
}
if (mes < 10) {
  mes = "0" + mes;
}

var fechaFormateada = dia + "/" + mes + "/" + anio;
document.getElementById("fechaactual").textContent = fechaFormateada;

// //FUNCIONES PARA OBTENER LOS MENUS
// function obtenerDesayuno() {
//   var xhr = cargarXHR(
//     "GET",
//     "https://python-flask-microservice-2.azurewebsites.net/consultar-disponibilidad"
//   );
//   xhr.open(method, url, true);
//   xhr.setRequestHeader("Content-Type", "application/json");

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       if (xhr.status === 200) {
//         var response = JSON.parse(xhr.responseText);
//         cargarDesayuno(response);
//         console.log(response);
//       } else {
//         console.error("Error en la solicitud: " + xhr.status);
//       }
//     }
//   };

//   xhr.send();
// }
// //FUNCIONES PARA CARGAR CADA MENU
// function cargarDesayuno(informacion) {
//   menudesayuno = document.getElementById("menuDesayuno");
//   menudesayuno.children[0].textContent = informacion.bebida;
//   menudesayuno.children[1].textContent = informacion.fruta;
//   menudesayuno.children[2].textContent = informacion.acompañamiento;
// }
// function cargarAlmuerzo(informacion) {
//   menualmuerzo = document.getElementById("menuAlmuerzo");
//   menualmuerzo.children[0].textContent = informacion.entrada;
//   menualmuerzo.children[1].textContent = informacion.bebida;
//   menualmuerzo.children[2].textContent = informacion.platofondo;
//   menualmuerzo.children[3].textContent = informacion.fruta;
// }
// function cargarCena(informacion) {
//   menucena = document.getElementById("menuCena");
//   menualcena.children[0].textContent = informacion.platofondo;
//   menualcena.children[1].textContent = informacion.bebida;
//   menualcena.children[2].textContent = informacion.postre;
// }

//OBTENER LOS TICKETS DISPONIBLES DE CADA COMIDA
function obtenerDisponibles() {
  var menu = document.getElementById("combo1").value;
  var xhr = cargarXHR(
    "GET",
    "https://ticketms.azurewebsites.net/consultar-disponibilidad?id_menu=" +
      menu +
      "&fecha=" +
      fechaFormateada
  );
  console.log("Enviando Solicitud");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        document.getElementById("restantes").textContent =
          "Tickets restantes: " + response.Disponibilidad;
      } else {
        console.error("Error en la solicitud: " + xhr.status);
      }
    }
  };

  xhr.send();
}

function reservar(id) {
  if (
    !document.getElementById("codigoEstudiante").value ||
    document.getElementById("codigoEstudiante").value == ""
  ) {
    alert("Ingresa un código de estudiante válido antes");
    return;
  }
  popup = document.getElementById("popup");
  popup.style.display = "block";
  cargarSelect(id);
  obtenerDisponibles();
}
function reservarTicket() {
  cerrarPopup();
  codestudiante = document.getElementById("codigoEstudiante").value;
  cod_menu = 01;
  var selectElement = document.getElementById("combo1");
  id_menu = selectElement.value;

  var formdata = new FormData();
  formdata.append("id_menu", id_menu);
  formdata.append("fecha", fechaFormateada);
  formdata.append("codigo_alumno", codestudiante);
  formdata.append("codigo_menu", cod_menu);

  var xhr = cargarXHR(
    "POST",
    "https://ticketms.azurewebsites.net/reservar-ticket"
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      // Petición exitosa
      var respuesta = JSON.parse(xhr.responseText);
      console.log(respuesta);
      alert(respuesta.mensaje);
    } else {
      // Error en la petición
      console.error("Error en la petición. Código de estado: " + xhr.status);
    }
  };

  // Enviar la petición con los datos en el cuerpo
  xhr.send(formdata);
}
//CERAR POPUP DE RESERVA DE TICKET
function cerrarPopup() {
  popup = document.getElementById("popup");
  popup.style.display = "none";
  document.getElementById("restantes").textContent = "Tickets restantes: ";
}

//FUNCION PARA CARGAR LOS COMBOBOX DE CADA COMIDA CON TURNO/HORA
function cargarSelect(id) {
  combobox = document.getElementById("combo1");
  while (combobox.firstChild) {
    combobox.removeChild(combobox.firstChild);
  }
  switch (id) {
    case "reservadesayuno":
      var nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = "menu01";
      nuevaOpcion.text = "07:00";
      // Agregar la nueva opción al select
      combobox.appendChild(nuevaOpcion);
      break;
    case "reservaalmuerzo":
      var nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = "menu02";
      nuevaOpcion.text = "12:00 - 12:24";
      // Agregar la nueva opción al select
      combobox.appendChild(nuevaOpcion);
      var nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = "menu03";
      nuevaOpcion.text = "12:25 - 12:49";
      // Agregar la nueva opción al select
      combobox.appendChild(nuevaOpcion);
      var nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = "menu04";
      nuevaOpcion.text = "12:50 - 13:14";
      // Agregar la nueva opción al select
      combobox.appendChild(nuevaOpcion);
      break;
    case "reservacena":
      var nuevaOpcion = document.createElement("option");
      nuevaOpcion.value = "menu05";
      nuevaOpcion.text = "16:00";
      // Agregar la nueva opción al select
      combobox.appendChild(nuevaOpcion);
      break;
    default:
      alert("Error cargando datos, vuelva a cargar la pagina");
      break;
  }
}

//FUNCION ADICIONAL
function cargarXHR(metodo, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(metodo, url, true);
  return xhr;
}
