class Room {
  constructor(roomId, options) {
    this.id = roomId;
    this.participants = [];
    this.votes = [];
    this.state = 'SCORING';
    this.options = options;
  }

  join(participant) {
    // Todo prevent paricipant from joining twice?
    this.participants.push(participant);
    this.notifyParticipants();
  }

  leave(leavingParticipant) {
    this.participants = this.participants.filter(participant => participant.id !== leavingParticipant.id);

    if (this.votes.length === this.participants.length) {
      this.state === 'REVEALED';
    }
    this.notifyParticipants();
  }

  vote(value, participant) {
    if (this.state !== 'SCORING') return;

    const existingVote = this.votes.find(vote => vote.participantId === participant.id);

    console.log(existingVote);

    if (existingVote) {
      existingVote.value = value;
    } else {
      this.votes.push({ value, participantId: participant.id});
    }

    if (this.votes.length === this.participants.length) {
      this.state = 'REVEALED';
    }

    this.notifyParticipants();
  }

  reset() {
    this.state = 'SCORING';
    this.votes = [];
    this.notifyParticipants();
  }

  reveal() {
    this.state = 'REVEALED';
    this.notifyParticipants();
  }

  changeOptions(options) {
    this.options = options;
    this.reset();
  }

  notifyParticipants() {
    this.participants.forEach(participant => {
      participant.socket.emit('roomState', this.getObservableState(participant));
    });
  }

  getObservableState(observingParticipant) {

    const observableParticipants = this.participants.map(participant => ({
      id: participant.id,
      displayName: participant.displayName,
      isYou: observingParticipant.id === participant.id,
    }));

    return {
      state: this.state,
      you: observableParticipants.find(participant => participant.isYou),
      participants: observableParticipants,
      votes: this.votes.map(vote => ({
        participantId: vote.participantId,
        value: this.state === 'SCORING' && vote.participantId !== observingParticipant.id ? null : vote.value,
      })),
      options: this.options,
    }
  }
}

module.exports = Room;
