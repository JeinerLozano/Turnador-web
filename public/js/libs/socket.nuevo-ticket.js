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

$('button').on('click', function() {
    let letra = $(this).data('letra');
    socket.emit('siguienteTicket', { letra: letra }, function(sigueenteTicket) {
        label.text(sigueenteTicket);
        /*
        // Crear los datos para imprimir
       var data = [{
            type: 'html',
            format: 'plain',
            data: '<html><body>' + sigueenteTicket + '</body></html>' // Reemplaza esto con tu contenido HTML
        }];

        // Imprimir los datos
        qz.print(config, data).catch(function(e) {
            console.error(e);
        });*/
    });
});