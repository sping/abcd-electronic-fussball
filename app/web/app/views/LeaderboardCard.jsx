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
              { this.props.stat.wins }
            </span>
            <span>
              <strong>Losses: </strong>
              { this.props.stat.losses }
            </span>
          </div>
          <div className="content-col">
            <span>
              <strong>Percentage: </strong>
              { this.props.stat.winRatio * 100 }%
            </span>
          </div>
          <hr />
          <div className="content-col">
            <span>
              <strong>Goals for: </strong>
              { this.props.stat.goalsFor }
            </span>
            <span>
              <strong>Goals against: </strong>
              { this.props.stat.goalsAgainst }
            </span>
          </div>
          <div className="content-col">
            <span>
              <strong>Difference: </strong>
              { (this.props.stat.goalsDiff > 0) ? (
                  '+' + this.props.stat.goalsDiff
                ) : (
                  this.props.stat.goalsDiff
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