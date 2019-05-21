module.exports = {
    joinRoom: (data, socket, io) => {
        console.log(data);
        socket.join(data.roomPin);
        io.to(data.roomPin).emit('welcome', data.roomPin);
    }
};
