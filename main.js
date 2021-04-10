const express = require("express");
const http = require("http");
const socketio = require('socket.io');

const Participant = require('./participant');

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

// console.log that your server is up and running
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

io.on('connection', socket => {
  socket.emit('connected');
  new Participant(io, socket);
});
