var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        renderizarUsuarios(resp);
    });

});

// Escucha cuando se pierde la conexion
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Escucha los mensaje enviados
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});


// Escucha mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    
    console.log('Mensaje Privado:', mensaje);
    
});



// Escucha la lista actual de las salas
// socket.on('listaPersona', function(personas) {
//     console.log(personas);
// });