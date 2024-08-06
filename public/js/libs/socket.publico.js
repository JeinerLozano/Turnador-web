var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblNombre1 = $('#lblNombre1');
var lblNombre2 = $('#lblNombre2');
var lblNombre3 = $('#lblNombre3');
var lblNombre4 = $('#lblNombre4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];
var lblNombre = [lblNombre1, lblNombre2, lblNombre3, lblNombre4];
//SOCKET PARA ACTULIZARLA HORA
socket.on('ActualizaHora', function(){
    const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  // Separar la fecha y la hora
  const fechaActual = now.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  const horaActual = now.toLocaleTimeString('es-CO', { hour: 'numeric', minute: 'numeric' });

  // Insertar la fecha y la hora en el div
  const horaDiv = document.querySelector('.hora-actual');
  const fechaDiv = document.querySelector('.fecha-actual')
  horaDiv.textContent = `${horaActual}`;
  fechaDiv.textContent = `${fechaActual}`
})


socket.on('estadoActual', function(data) {
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', function(data) {
    //console.log("data refress", data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4);
    
})

function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text(ultimos4[i].numero);
        lblNombre[i].text(ultimos4[i].nombre_usuario)
        lblEscritorios[i].text('Modulo'+ultimos4[i].escritorio);
    }
}