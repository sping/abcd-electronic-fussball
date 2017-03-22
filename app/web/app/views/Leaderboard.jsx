import React, { Component } from 'react';
import { connect } from 'react-redux'
import { playerStats } from '../actions/leaderboardActions';
import { setTitle, resetTitle } from '../actions/titlebarActions';
import LeaderboardItem from './LeaderboardItem';
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

  openDetailStats (stat) {
    console.log('test', stat)
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
      <div id="leaderboard" onClick={this.test}>
        {
          this.props.playerStats.map((stat, index) => {
            return <LeaderboardItem stat={stat} key={index} onClick={() => {this.openDetailStats(stat)}} />    
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
