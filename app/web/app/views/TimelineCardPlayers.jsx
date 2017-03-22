import React, { Component } from 'react';
import { connect } from 'react-redux'

class TimelineCardPlayers extends Component {
  constructor (props) {
    super(props);
  }
  
  render() {
    if (!this.props.matchPlayers) {
      return (
        <div>Loading..</div>
      )
    }
    return (
      <div className="app-timeline-card-players">
        {
          this.props.matchPlayers.map((matchPlayer) => {
            if (matchPlayer.homeTeam !== this.props.homeTeam || !matchPlayer.player) {
              return
            }

            return <div key={matchPlayer.id}>{matchPlayer.player.user.firstName}</div>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(TimelineCardPlayers);
