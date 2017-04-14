export default class TimelineObject {

  constructor(object) {
    if (object) {
      this.goalsAgainst = object.goalsAgainst;
      this.goalsDiff =    object.goalsDiff;
      this.goalsFor =     object.goalsFor;
      this.losses =       object.losses;
      this.kind =         object.kind;
      this.notes =        object.notes;
      this.playedAt =     object.playedAt;
    }
  }
}
