const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const Participant = require("./participant");

const PORT = process.env.PORT || 8080;

const PRODUCTION_MODE = process.env.NODE_ENV === "production";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// console.log that your server is up and running
server.listen(PORT, () => console.log(`Listening on port ${PORT} in ${PRODUCTION_MODE ? "production" : "debug"} mode`));

io.on("connection", socket => {
  socket.emit("connected");
  new Participant(io, socket);
});
