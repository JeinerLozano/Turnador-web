var socket = io();

socket.on('todosSiguiente' , function(data){
    ActualizaTabla(data.tickets);
})

socket.on('todosTickets', function (data) {
    //console.log(data.tickets);
    ActualizaTabla(data.tickets);
})



function ActualizaTabla(tickets) {
    // Obtener la referencia al tbody
    var tbody = document.querySelector('.contenido_tickets');

    // Limpiar el contenido actual del tbody
    tbody.innerHTML = '';
    for (let i = 0; i <= tickets.length - 1; i++) {

        var fila = document.createElement('tr');

        var celda1 = document.createElement('td');
        celda1.textContent = tickets[i].numero // Reemplaza 'propiedad1' con el nombre real de la propiedad del ticket
        fila.appendChild(celda1);

        var celda2 = document.createElement('td');
        celda2.textContent = tickets[i].tipo_acto; // Reemplaza 'propiedad2' con el nombre real de la propiedad del ticket
        fila.appendChild(celda2);

        var celda3 = document.createElement('td');
        celda3.textContent = tickets[i].nombre_usuario; // Reemplaza 'propiedad2' con el nombre real de la propiedad del ticket
        fila.appendChild(celda3);

        // Agregar la fila al tbody
        tbody.appendChild(fila);


    }
}