app.io.on('connection', function(socket) {
	console.log('Connected ' + socket.id);
	Bus.sockets[socket.id] = socket;

	socket.on('disconnect', () => delete Bus.sockets[socket.id]);
});
