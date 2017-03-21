import React, { Component } from 'react';
import { connect } from 'react-redux'
import { playerStats } from '../actions/leaderboardActions';
import { setTitle, resetTitle } from '../actions/titlebarActions';
import LeaderboardCard from './LeaderboardCard';
import axios from '../axios';
import constants from '../constants'

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
      <div id="leaderboard">
        {
          this.props.playerStats.map((stat, index) => {
            return <LeaderboardCard stat={stat} key={index} />    
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
