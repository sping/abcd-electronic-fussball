import React, { Component } from 'react';
import { connect } from 'react-redux'
import constants from '../constants'

class LeaderboardCard extends Component {
  constructor (props) {
    super(props);
  }
  
  render() {
    let gamesWon = null
    let gamesLost = null
    let gameRatio = null
    let goalsFor = null
    let goalsAgainst = null
    let goalsDiff = null

    if (this.props.stat && this.props.stat.stats && this.props.stat.stats[0]) {
      let stat = this.props.stat.stats[0]
      gamesWon = stat.gamesWon
      gamesLost = stat.gamesLost
      gameRatio = Math.round(stat.gameRatio * 100) 
      goalsFor = stat.goalsFor
      goalsAgainst = stat.goalsAgainst
      goalsDiff = stat.goalsDiff
    }

    return (
      <div className="card">
        <div className="title-row">
          <img src={this.props.stat.user.avatarUrl || constants.defaultAvatarUrl} />
          <h3>{ this.props.stat.user.firstName } { this.props.stat.user.lastName }</h3>
        </div>
        <div className="content-row">
          <div className="content-col">
            <span>
              <strong>Wins: </strong>
              { gamesWon }
            </span>
            <span>
              <strong>Losses: </strong>
              { gamesLost }
            </span>
          </div>
          <div className="content-col">
            <span>
              <strong>Ratio: </strong>
              { gameRatio }%
            </span>
          </div>
          <hr />
          <div className="content-col">
            <span>
              <strong>Goals for: </strong>
              { goalsFor }
            </span>
            <span>
              <strong>Goals against: </strong>
              { goalsAgainst }
            </span>
          </div>
          <div className="content-col">
            <span>
              <strong>Difference: </strong>
              { (goalsDiff > 0) ? (
                  '+' + goalsDiff
                ) : (
                  goalsDiff
                )
              }
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(LeaderboardCard);
