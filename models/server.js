/* Modelos del servidor */
// Servidor del server
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');


class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        // Configuracion de socket server
        this.io = socketio( this.server, {/* Configuraciones */} );

    }

    middlewares() {
        // Desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname , '../public')) );

    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();


        // Inicializar sockets
        this.configurarSockets();

        // Inicializar server
        this.server.listen(this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }
}

// Exportacion por defecto
module.exports = Server;