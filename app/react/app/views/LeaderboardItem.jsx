import React, { Component } from 'react';
import { connect } from 'react-redux'
import constants from '../constants'
import '../stylesheets/views/leaderboard-item.sass';

class LeaderboardItem extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    let avatarUrl = null
    let firstName = null
    let lastName = null
    let gamesWon = null
    let gamesLost = null
    let gameRatio = null

    if (this.props.stat && this.props.stat.stats) {
      if (this.props.stat.stats[0]) {
        gamesWon = this.props.stat.stats[0].gamesWon
        gamesLost = this.props.stat.stats[0].gamesLost
        gameRatio = Math.round(this.props.stat.stats[0].gameRatio * 100) 
      }

      if (this.props.stat.user) {
        avatarUrl = this.props.stat.user.avatarUrl
        firstName = this.props.stat.user.firstName
        lastName = this.props.stat.user.lastName
      }
    }

    return (
      <div className="app-leaderboard-item">
        <div className="app-leaderboard-item-title">
          <img src={avatarUrl || constants.defaultAvatarUrl} />
          <h3>{ firstName } { lastName }</h3>
        </div>
        <hr />
        <div className="app-leaderboard-item-content">
          <span>
            <strong>W: </strong>
            { gamesWon }
          </span>
          <span>
            <strong>L: </strong>
            { gamesLost }
          </span>
          <span>
            <strong>R: </strong>
            { gameRatio }%
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(LeaderboardItem);
