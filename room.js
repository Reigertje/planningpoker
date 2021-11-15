class Room {
  constructor(roomId, options) {
    this.id = roomId;
    this.participants = [];
    this.votes = [];
    this.state = "SCORING";
    this.options = options;
  }

  votingParticipants() {
    return this.participants.filter((participant) => !participant.isSpectator);
  }

  revealVotesIfNeeded() {
    if (this.votingParticipants().length === 0) {
      this.state = "SCORING";
    } else if (this.votes.length === this.votingParticipants().length) {
      this.state = "REVEALED";
    }
  }

  removeVoteForParticipant(participant) {
    this.votes = this.votes.filter(
      (vote) => vote.participantId !== participant.id
    );

    this.revealVotesIfNeeded();
  }

  join(participant) {
    // Todo prevent paricipant from joining twice?
    this.participants.push(participant);
  }

  leave(leavingParticipant) {
    this.participants = this.participants.filter(
      (participant) => participant.id !== leavingParticipant.id
    );

    this.revealVotesIfNeeded();
  }

  vote(value, participant) {
    if (this.state !== "SCORING") return;
    if (participant.isSpectator) return;

    const existingVote = this.votes.find(
      (vote) => vote.participantId === participant.id
    );

    if (existingVote) {
      existingVote.value = value;
    } else {
      this.votes.push({ value, participantId: participant.id });
    }

    this.revealVotesIfNeeded();
  }

  reset() {
    this.state = "SCORING";
    this.votes = [];
  }

  reveal() {
    this.state = "REVEALED";
  }

  changeOptions(options) {
    this.options = options;
    this.reset();
  }

  notifyParticipants() {
    this.participants.forEach((participant) => {
      participant.socket.emit(
        "roomState",
        this.getObservableState(participant)
      );
    });
  }

  getObservableState(observingParticipant) {
    const observableParticipants = this.participants.map((participant) => ({
      id: participant.id,
      displayName: participant.displayName,
      isSpectator: participant.isSpectator,
      isYou: observingParticipant.id === participant.id,
    }));

    return {
      state: this.state,
      you: observableParticipants.find((participant) => participant.isYou),
      participants: observableParticipants,
      votes: this.votes.map((vote) => ({
        participantId: vote.participantId,
        value:
          this.state === "SCORING" &&
          vote.participantId !== observingParticipant.id
            ? null
            : vote.value,
      })),
      options: this.options,
    };
  }
}

module.exports = Room;
