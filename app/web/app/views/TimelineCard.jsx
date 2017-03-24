import React, { Component } from 'react';
import { connect } from 'react-redux'
import TimelineCardPlayers from './TimelineCardPlayers'
import '../stylesheets/views/timeline-card.sass'

class TimelineCard extends Component {
  constructor (props) {
    super(props);
  }

  formatTime (date) {
    var date = new Date(date)
    var hours = date.getHours();
    if (hours < 10) {
      hours = '0' + hours
    }

    var minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes
    }

    return `${hours}:${minutes}`
  }

  formatDate (date) {
    var date = new Date(date)
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }
  
  render() {
    if (!this.props.match) {
      return (
        <div></div>
      )
    }
    return (
      <div className="app-timeline-card">
        <div className="app-timeline-card-datetime">
          <h6>
            { this.formatTime(this.props.match.playedAt) } { this.formatDate(this.props.match.playedAt) }
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
