export default class TimelineObject {
  constructor(timelineObject) {
    if (timelineObject) {
      this.goalsAgainst: timelineObject.goalsAgainst;
      this.goalsDiff: timelineObject.goalsDiff;
      this.goalsFor: timelineObject.goalsFor;
      this.losses: timelineObject.losses;
      this.kind: timelineObject.kind;
      this.notes: timelineObject.notes;
      this.playedAt: timelineObject.playedAt;
    }
  }
}
