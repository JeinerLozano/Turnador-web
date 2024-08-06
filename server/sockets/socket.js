const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
//ESTE SOCKET TRAE LA INFORMACION DEL TICKET PARA ARCHIVARLO EN EL JSON
    client.on('siguienteTicket', (data, callback) => {


        let siguiente = ticketControl.siguiente(data.letra, data.nombre_usuario, data.cedula_usuario);
        callback(siguiente);
        //ACA  EMITE UN SOCKET PARA EN LA TABLA DEL ESCRITORIO O MODULO DEL EMPLEADO ME VISUALICE ESE TICKET EN LA TABLA COMO ESPERA 
        client.emit('todosSiguiente', { tickets: ticketControl.getAllTickets() })

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimo4Ticket()
    });
    //MIENTRAS ESTA FUNCIONANDO LA APLICACION ME EMITE CADA 2 SEGUNTO ESATA FUNCION PARA ACTUALIZAR LAS TABLAS DE LOS MODULOS 
    setInterval(function () {
        client.emit('todosTickets', {
            tickets: ticketControl.getAllTickets()
        })
    }, 2000)

    setInterval(function () {
        client.emit('ActualizaHora',)
    }, 1000)

    client.on('atenderTicektPref', (data, callback) => {
        if (!data.escritorio || !data.tipo_acto) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }
        let atenderTicketPref = ticketControl.atenderTicketPref(data.escritorio, data.tipo_acto, data.numero);
        callback(atenderTicketPref);

        //actualizar / notifcar cambio en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimo4Ticket()
        })
        //actualiza la tabla de escritorio con los tickets actuales 
        client.emit('todosTickets', {
            tickets: ticketControl.getAllTickets()
        })

    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio || !data.tipo_acto) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio, data.tipo_acto);

        callback(atenderTicket);

        //actualizar / notifcar cambio en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimo4Ticket()
        })
        //actualiza la tabla de escritorio con los tickets actuales 
        client.emit('todosTickets', {
            tickets: ticketControl.getAllTickets()
        })
    })

});