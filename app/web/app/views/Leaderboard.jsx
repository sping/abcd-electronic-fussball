import React, { Component } from 'react';
import { connect } from 'react-redux'
import { playerStats } from '../actions/leaderboardActions';
import { setTitle, resetTitle } from '../actions/titlebarActions';
import axios from '../axios';

class Leaderboard extends Component {
  constructor (props) {
    super(props);
  }

  getStats () {
    axios.get('/players/stats')
    .then((response) => {
      this.props.dispatch(playerStats(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentWillMount () {
    this.getStats()
  }

  render() {
    if (!this.props.playerStats) {
      return (
        <div>
          Loading..
        </div>
      );
    }
    return (
      <div id="leader-board">
        {
          this.props.playerStats.map((statistic, index) => {
            return <p key={index}>
              { statistic.user.firstName } { statistic.user.lastName }
              { statistic.goalsFor }
            </p>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playerStats: state.leaderboard.playerStats,
  }
};

export default connect(mapStateToProps)(Leaderboard);
