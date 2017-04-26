import React, { Component } from 'react';
import { connect } from 'react-redux'
import constants from '../constants'

class LeaderboardCard extends Component {
  constructor (props) {
    super(props);
  }
  
  render() {
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
              { this.props.stat.stats[0].gamesWon }
            </span>
            <span>
              <strong>Losses: </strong>
              { this.props.stat.stats[0].gamesLost }
            </span>
          </div>
          <div className="content-col">
            <span>
              <strong>Ratio: </strong>
              { Math.round(this.props.stat.stats[0].gameRatio * 100) }%
            </span>
          </div>
          <hr />
          <div className="content-col">
            <span>
              <strong>Goals for: </strong>
              { this.props.stat.stats[0].goalsFor }
            </span>
            <span>
              <strong>Goals against: </strong>
              { this.props.stat.stats[0].goalsAgainst }
            </span>
          </div>
          <div className="content-col">
            <span>
              <strong>Difference: </strong>
              { (this.props.stat.stats[0].goalsDiff > 0) ? (
                  '+' + this.props.stat.stats[0].goalsDiff
                ) : (
                  this.props.stat.stats[0].goalsDiff
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
