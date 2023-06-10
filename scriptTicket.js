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

function consultaTicket() {
  codigo = document.getElementById("codigoEstudiante").value;
  var xhr = cargarXHR(
    "GET",
    "https://ticketms.azurewebsites.net/consultar?codigo=" + codigo
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        cargarTicket(response);
      } else {
        console.error("Error en la solicitud: " + xhr.status);
      }
    }
  };

  xhr.send();
}
function cargarTicket(response) {
  if (Object.keys(response).length === 0) {
    alert("No hay un ticket reservado");
  } else {
    document.getElementById("ticket-template").style.display = "block";
    document.getElementById("numero_ticket").textContent =
      "Nro Ticket: " + response.nro_ticket;
    document.getElementById("tipo_comida").textContent =
      "TIPO DE COMIDA: " + response.id_menu;
    document.getElementById("fecha_turno").textContent =
      "FECHA: " + response.fecha;
    document.getElementById("codigo").textContent =
      "Código de Estudiante: " + response.codigo_alumno;
  }
  // if (Object.keys(respuesta).length === 0) {
  //   alert("No tiene un ticket reservado");
  //   window.location.href = "/mainContent.html";
  // } else {
  //   document.getElementById("buscador").style.display = "none";
  //   document.getElementById("ticket-template").style.display = "block";
  // }
}
//FUNCION ADICIONAL
function cargarXHR(metodo, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(metodo, url, true);
  return xhr;
}
