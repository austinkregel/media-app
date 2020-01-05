app.io.on('connection', function(socket) {
	Bus.sockets[socket.id] = socket;

	socket.on('disconnect', () => delete Bus.sockets[socket.id]);
});
