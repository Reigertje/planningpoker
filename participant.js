const Room = require("./room");

// Questionable global var
var ROOMS = {};

const getRoom = (roomId) => {
  const room = ROOMS[roomId];
  if (!room) throw new Error("Room not found!");
  return room;
};

const generateId = (length) => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

class Participant {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.displayName = null;
    this.isSpectator = false;
    this.id = this.socket.id;
    this.room = null;

    socket.on("create", this.onCreateRoom.bind(this));
    socket.on("join", this.onJoinRoom.bind(this));
    socket.on("disconnect", this.onDisconnect.bind(this));
    socket.on("name", this.onChangeName.bind(this));
    socket.on("profile", this.onProfileChange.bind(this));
    socket.on("vote", this.onVote.bind(this));
    socket.on("reveal", this.onReveal.bind(this));
    socket.on("reset", this.onReset.bind(this));
    socket.on("options", this.onChangeOptions.bind(this));
    socket.on("leave", this.onDisconnect.bind(this));
  }

  onCreateRoom(options, callback) {
    console.log(`${new Date().toISOString()} ${this.displayName || this.id} created room`);

    if (this.room != null) {
      this.onDisconnect();
    }

    this.room = new Room(generateId(4), options);
    ROOMS[this.room.id] = this.room;
    this.room.join(this);
    this.room.notifyParticipants();
    callback(this.room.id);
  }

  onJoinRoom(roomId, callback) {
    console.log(`${new Date().toISOString()} ${this.displayName || this.id} is joining room`);
    if (this.room != null) {
      if (this.room.id === roomId) {
        this.room.notifyParticipants();
        return;
      }
      this.onDisconnect();
    }
    try {
      this.room = getRoom(roomId);
      this.room.join(this);
      this.room.notifyParticipants();

      console.log(`${new Date().toISOString()} ${this.displayName || this.id} joined room`);
    } catch (error) {
      callback(false);
      console.error(error);
    }
  }

  onDisconnect() {
    console.log(`${new Date().toISOString()} ${this.displayName || this.id} left room`);

    if (this.room) {
      this.room.leave(this);
      this.room.notifyParticipants();

      if (this.room.participants.length === 0) {
        ROOMS[this.room.id] = null;
      }
      this.room = null;
    }
  }

  onChangeName(name) {
    if (this.displayName === name) return;

    this.displayName = name;

    console.log(`${new Date().toISOString()} ${this.displayName || this.id} changed name to ${name}`);

    if (this.room) {
      this.room.notifyParticipants();
    }
  }

  onProfileChange(profile) {
    this.displayName = profile.displayName;
    this.isSpectator = !!profile.isSpectator;

    if (this.room) {
      if (this.isSpectator) {
        this.room.removeVoteForParticipant(this);
      }

      this.room.notifyParticipants();
    }
  }

  onChangeOptions(options) {
    console.log(`${new Date().toISOString()} ${this.displayName || this.id} changed options`);
    if (this.room) {
      this.room.changeOptions(options);
      this.room.notifyParticipants();
    }
  }

  onVote(vote) {
    console.log(`${new Date().toISOString()} ${this.displayName || this.id} voted`);
    if (this.room) {
      this.room.vote(vote, this);
      this.room.notifyParticipants();
    }
  }

  onReveal() {
    console.log(`${new Date().toISOString()} ${this.displayName || this.id} revealed`);
    if (this.room) {
      this.room.reveal();
      this.room.notifyParticipants();
    }
  }

  onReset() {
    console.log(`${new Date().toISOString()} ${this.displayName || this.id} reset`);
    if (this.room) {
      this.room.reset();
      this.room.notifyParticipants();
    }
  }
}

module.exports = Participant;
