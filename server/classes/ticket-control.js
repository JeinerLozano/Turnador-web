const fs = require('fs');

class Ticket {

    constructor(numero, escritorio, tipo_acto, nombre_usuario, cedula_usuario) {
        this.numero = numero;
        this.escritorio = escritorio;
        this.tipo_acto = tipo_acto;
        this.nombre_usuario = nombre_usuario;
        this.cedula_usuario = cedula_usuario;
    }

}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        this.consecutivos = {};

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
            this.consecutivos = data.consecutivos;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente(letra, nombre_usuario, cedula_usuario) {
        // Verifica si ya existe un consecutivo para la letra, si no existe, inicializa en 0
        if (!this.consecutivos[letra]) {
            this.consecutivos[letra] = 0;
        }

        // Incrementa el consecutivo para la letra dada
        this.consecutivos[letra] += 1;
        // this.ultimo += 1;
        //this.ultimo = `A${consecutivo}`;
        //console.log(nombre_usuario, cedula_usuario)
        let ticket = new Ticket(`${letra}${this.consecutivos[letra]}`, null, `${letra}`,nombre_usuario, cedula_usuario);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket: ${nombre_usuario} - ${letra}${this.consecutivos[letra]}`;
    }

    getUltimoTicket() {
        return `Ticket: ${this.ultimo}`;
    }

    getUltimo4Ticket() {
        return this.ultimos4;
    }
    getAllTickets(){
        return this.tickets;
    }


    atenderTicket(escritorio, tipo_acto) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        //BUSCA EN EL ARRAY TICKETS SI EXISTE UNA LETRA IGUAL A LA SELECCIONADA EN EL ESCRITORIO
        let indice = -1;
        for (let i = 0; i < this.tickets.length; i++) {
            if (this.tickets[i].tipo_acto === tipo_acto) {
                indice = i;
                break;
            }
        }
        //SI LA ENCUENTRA REALIZA EL PROCESO PARA ELIMINARLA
        if (indice !== -1) {
            let numeroTicket = this.tickets[indice].numero; // INDICE ES LA POSICION EN LA QUE SE ECUENTRA LA PRIMERA LETRA BUSCADA EN EL ARRAY
            let nombre_usuario = this.tickets[indice].nombre_usuario;
            let cedula_usuario = this.tickets[indice].cedula_usuario;
            this.tickets.splice(indice, 1);//SPLICE ELIMINA LA POSICION DONDE SE ENCUENTRA LA PRIMERA LETRA
            // this.tickets.shift();
            let atenderTicket = new Ticket(numeroTicket, escritorio, tipo_acto, nombre_usuario, cedula_usuario)
            this.ultimos4.unshift(atenderTicket);
            if (this.ultimos4.length > 4) {
                this.ultimos4.splice(-1, 1); //borra el ultimo
            }
            this.grabarArchivo();
            //console.log(atenderTicket.numero +" "+atenderTicket.escritorio + " " + atenderTicket.tipo_acto);
            return atenderTicket;
        } else {
            return `No hay mas tickets de tus actos`;
        }

    }

    atenderTicketPref(escritorio, tipo_acto, numero ) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        //busca un numero de ticket en el array tickets 
        let indice = -1;
        for (let i = 0; i < this.tickets.length; i++) {
            if (this.tickets[i].numero === numero) {
                indice = i;
                break;
            }
        }
         //SI LA ENCUENTRA REALIZA EL PROCESO PARA ELIMINARLA
         if (indice !== -1) {
            let nombre_usuario = this.tickets[indice].nombre_usuario;
            let cedula_usuario = this.tickets[indice].cedula_usuario;
            //let numeroTicket = this.tickets[indice].numero; // INDICE ES LA POSICION EN LA QUE SE ECUENTRA LA PRIMERA LETRA EN EL ARRAY
            this.tickets.splice(indice, 1);//SPLICE ELIMINA LA POSICION DONDE SE ENCUENTRA LA PRIMERA LETRA
            // this.tickets.shift();
            let atenderTicket = new Ticket(numero, escritorio, tipo_acto, nombre_usuario, cedula_usuario)
            this.ultimos4.unshift(atenderTicket);
            if (this.ultimos4.length > 4) {
                this.ultimos4.splice(-1, 1); //borra el ultimo
            }
            this.grabarArchivo();
            //console.log(atenderTicket.numero +" "+atenderTicket.escritorio + " " + atenderTicket.tipo_acto);
            return atenderTicket;
        } else {
            return `No se encontró el ticket`;
        }
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.consecutivos = {};
        console.log('se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
            consecutivos: this.consecutivos
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString); //guardar archivo

    }

}


module.exports = {
    TicketControl
}