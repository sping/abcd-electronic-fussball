import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment'
import TimelineCardPlayers from './TimelineCardPlayers'
import '../stylesheets/views/timeline-card.sass'

class TimelineCard extends Component {
  constructor (props) {
    super(props);
  }
  
  render() {
    if (!this.props.match) {
      return (
        <div />
      )
    }
    return (
      <div className="app-timeline-card">
        <div className="app-timeline-card-datetime">
          <h6>
            { moment(this.props.match.playedAt).format('HH:mm') }
          </h6>
        </div>
        <div className="app-timeline-card-scores">
          <div className="app-timeline-card-left-players">
            <TimelineCardPlayers homeTeam={true} matchPlayers={this.props.match.match_players} />
          </div>
          <div className="app-timeline-card-score">
            <h3>{ this.props.match.homeScore } - { this.props.match.awayScore }</h3>
          </div>
          <div className="app-timeline-card-right-players">
            <TimelineCardPlayers homeTeam={false} matchPlayers={this.props.match.match_players} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(TimelineCard);
