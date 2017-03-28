import React, { Component } from 'react';
import { connect } from 'react-redux'
import constants from '../constants'
import '../stylesheets/views/leaderboard-item.sass';

class LeaderboardItem extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="app-leaderboard-item">
        <div className="app-leaderboard-item-title">
          <img src={this.props.stat.user.avatarUrl || constants.defaultAvatarUrl} />
          <h3>{ this.props.stat.user.firstName } { this.props.stat.user.lastName }</h3>
        </div>
        <hr />
        <div className="app-leaderboard-item-content">
          <span>
            <strong>W: </strong>
            { this.props.stat.stat.gamesWon }
          </span>
          <span>
            <strong>L: </strong>
            { this.props.stat.stat.gamesLost }
          </span>
          <span>
            <strong>R: </strong>
            { Math.ceil(this.props.stat.stat.gameRatio * 100) }%
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
