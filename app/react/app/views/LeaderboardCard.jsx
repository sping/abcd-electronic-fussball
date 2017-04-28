import React, { Component } from 'react';
import { connect } from 'react-redux'
import constants from '../constants'

class LeaderboardCard extends Component {
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
    let goalsFor = null
    let goalsAgainst = null
    let goalsDiff = null

    if (this.props.stat && this.props.stat.stats) {
      if (this.props.stat.stats[0]) {
        gamesWon = this.props.stat.stats[0].gamesWon
        gamesLost = this.props.stat.stats[0].gamesLost
        gameRatio = Math.round(this.props.stat.stats[0].gameRatio * 100) 
        goalsFor = this.props.stat.stats[0].goalsFor
        goalsAgainst = this.props.stat.stats[0].goalsAgainst
        goalsDiff = this.props.stat.stats[0].goalsDiff
      }

      if (this.props.stat.user) {
        avatarUrl = this.props.stat.user.avatarUrl
        firstName = this.props.stat.user.firstName
        lastName = this.props.stat.user.lastName
      }
    }

    return (
      <div className="card">
        <div className="title-row">
          <img src={avatarUrl || constants.defaultAvatarUrl} />
          <h3>{ firstName } { lastName }</h3>
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
