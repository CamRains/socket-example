const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socketController = require('./controller/socketController');

// Can still hit normal rest API endpoints
app.get('/api/stuff', (req, res) => {
    res.status(200).send('HIT');
});

// Still have access to app inside of the server sockets
app.set('stuff', 'Hello this is me');

// When a new client is formed it automatically runs this callback
io.on('connection', function(socket) {
    // someone connects
    console.log('Connected');

    // can access app variables
    console.log(app.get('stuff'));

    // Server sends a message to the client
    socket.emit('news', 'Hello World');

    //  Server can receive from the client
    socket.on('my other event', function(data) {
        console.log(data);
        // and send back to them
        socket.emit('custom message', 'Complete');
    });

    // Can move callback functions out to a controller file, but
    // in order to run they need access to the socket and possibly
    // the server itself
    socket.on('Join Room', data => socketController.joinRoom(data, socket, io));
});

// Set the server to listen on whatever port you are using
server.listen(4000, () => console.log('Server is running'));
