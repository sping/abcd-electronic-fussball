import React, { Component } from 'react';
import { connect } from 'react-redux'
import SegmentedControl from 'react-segmented-control'
import { playerStats } from '../actions/leaderboardActions';
import { setTitle, resetTitle } from '../actions/titlebarActions';
import LeaderboardItem from './LeaderboardItem';
import axios from '../axios';
import constants from '../constants'

class Leaderboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      period: 'week'
    }
  }
  

  getStats (period) {
    axios.get('/players/stats?period=' + (period || 'overall'))
    .then((response) => {
      this.props.dispatch(playerStats(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount () {
    this.getStats()
  }

  setPeriod (period) {
    this.setState({period: period})
    this.getStats(period)
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
      <div id="leaderboard" className="main-container">
        <SegmentedControl 
          onChange={this.setPeriod.bind(this)} 
          value={this.state.period}
          name="period">
          <span value="week">Week</span>
          <span value="month">Month</span>
          <span value="overall">Overall</span>
        </SegmentedControl>

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
