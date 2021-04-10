const Room = require('./room');

// Yuck! Maybe use redis?
var ROOMS = {};

const getRoom = roomId => {
  const room = ROOMS[roomId];
  if (!room) throw new Error('Room not found!');
  return room;
}

const generateId = length => {
   var result           = '';
   var characters       = '0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

class Participant {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.displayName = null;
    this.id = this.socket.id;
    this.room = null;

    socket.on('create', this.onCreateRoom.bind(this));
    socket.on('join', this.onJoinRoom.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('name', this.onChangeName.bind(this));
    socket.on('vote', this.onVote.bind(this));
    socket.on('reveal', this.onReveal.bind(this));
    socket.on('reset', this.onReset.bind(this));
    socket.on('options', this.onChangeOptions.bind(this));
    socket.on('leave', this.onDisconnect.bind(this));
  }

  onCreateRoom(options, callback) {
    if (this.room != null) {
      this.onDisconnect();
    }

    this.room = new Room(generateId(4), options);
    ROOMS[this.room.id] = this.room;
    this.room.join(this);
    callback(this.room.id);
  }

  onJoinRoom(roomId, callback) {
    if (this.room != null) {
      if (this.room.id === roomId) return;
      this.onDisconnect();
    }
    try {
      this.room = getRoom(roomId);
      this.room.join(this);
      console.log(`${this.socket.id} joined room`);
    } catch (error) {
      callback(false);
      console.error(error);
    }
  }

  onDisconnect() {
    console.log(`${this.socket.id} left room`);
    if (this.room) {
      this.room.leave(this);

      if (this.room.participants.length === 0) {
        ROOMS[this.room.id] = null;
      }
      this.room = null;
    }
  }

  onChangeName(name) {
    this.displayName = name;

    if (this.room) {
      this.room.notifyParticipants();
    }
  }

  onChangeOptions(options) {
    if (this.room) {
      this.room.changeOptions(options);
    }
  }

  onVote(vote) {
    this.room.vote(vote, this);
  }

  onReveal() {
    this.room.reveal();
  }

  onReset() {
    this.room.reset();
  }
}



module.exports = Participant;
