
class Sockets {
    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => { 

            // Escuchar eventos: mensaje-to-server
            socket.on('mensaje-to-server', (data) => {
                console.log(data);
        
                // Se emite a un cliente a la vez
                // socket.emit('mensaje-from-server', data);

                // Se emite a todos lo que esten conectados
                this.io.emit('mensaje-from-server', data);
            });
        
        });
    }
}

module.exports = Sockets;