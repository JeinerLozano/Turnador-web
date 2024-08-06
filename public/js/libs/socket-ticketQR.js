var socket = io();
var label = $("#lblNuevoTicket");
//var config = qz.configs.create("Wondershare PDFelement");

socket.on('connect', function() {
    console.log("conectadooo");
});

socket.on('disconnect', function() {
    console.log("desconectado");
});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});
//con este codigo me traigo la informacion del form de el html qr.html
const miFormulario = document.getElementById('miFormulario');
// le creo un evento al formulario de tipo submit esto con el fin de que  al darle al boton este me envie la informacion
miFormulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente
  let cedula = document.getElementById('cedula').value; //me traigo la info de la cedula 
  let nombre = document.getElementById('nombre').value; //me traigo la info del nombre
  let letraDropdown = document.getElementById('letraDropdown');// me traigo la info del selecto
  let selectedOption = letraDropdown.options[letraDropdown.selectedIndex]; // me muestra la informacion sleccionada
  let letra = selectedOption.getAttribute('data-letra');// me trae la letra de la informacion
  //console.log('Letra seleccionada:', letra);
  //console.log('Nombre escrito:', nombre);
  //console.log('CedulaEscrita', cedula);

  // ENVIO LA INFORMACION DEL FORM AL SOCKET
  socket.emit('siguienteTicket', { letra: letra, nombre_usuario: nombre, cedula_usuario: cedula }, function(sigueenteTicket) {
    label.text(sigueenteTicket);
  });
  
});
