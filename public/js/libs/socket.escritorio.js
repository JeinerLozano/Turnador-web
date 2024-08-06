var socket = io();
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio');
var tipo_acto = searchParams.get('tipo_acto');
var label = $('small');
var label2 = $('.acto_turno');

$('h1').text('Modulo ' + escritorio)

$('.ticket_normal').on('click', function() {
   

    socket.emit('atenderTicket', { escritorio: escritorio, tipo_acto: tipo_acto }, function(resp) {

        if (resp === 'No hay tickets' || resp === `No hay mas tickets de tus actos`) {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero);
        label2.text('Atendiendo tickets: ' + resp.tipo_acto + ' Usuario '+ resp.nombre_usuario);
        //$('body').append(label2);

    });

    

})

$('form').on('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página

    var numero = $('input[name="num-ticket"]').val(); // Obtiene el valor del input
    socket.emit('atenderTicektPref', { escritorio: escritorio, tipo_acto: tipo_acto, numero: numero }, function(resp) {

        if (resp === 'No hay tickets' || resp === `No se encontró el ticket`) {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero);
        label2.text('Atendiendo tickets: ' + resp.tipo_acto + ' Usuario '+ resp.nombre_usuario);
        //$('body').append(label2);

    });

    

})