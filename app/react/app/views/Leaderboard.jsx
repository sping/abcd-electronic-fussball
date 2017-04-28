import React, { Component } from 'react';
import { connect } from 'react-redux'
import SegmentedControl from 'react-segmented-control'
import { playerStatsWeek, playerStatsMonth, playerStatsOverall } from '../actions/leaderboardActions';
import { setTitle, resetTitle } from '../actions/titlebarActions';
import { leaderboardPeriod as periodAction } from '../actions/settingsActions';
import LeaderboardItem from './LeaderboardItem';
import axios from '../axios';
import constants from '../constants'

class Leaderboard extends Component {
  constructor (props) {
    super(props);
  }
  
  getStats (period) {
    axios.get('/players/stats?period=' + (period || 'overall'))
    .then((response) => {
      switch (period) {
        case 'week':
          this.props.dispatch(playerStatsWeek(response.data));
          break;
        case 'month':
          this.props.dispatch(playerStatsMonth(response.data));
          break;
        case 'overall':
          this.props.dispatch(playerStatsOverall(response.data));
          break;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount () {
    // You would expect to see getStats() here, but since the SegmentedControl already fires it after the first render, it's ok
  }

  setPeriod (period) {
    this.props.dispatch(periodAction(period));
    this.getStats(period)
  }

  render() {
    const stats = this.props[this.props.period + 'Stats']
    return (
      <div id="leaderboard" className="main-container">
        <SegmentedControl 
          onChange={this.setPeriod.bind(this)} 
          value={this.props.period}
          name="period">
          <span value="week">Week</span>
          <span value="month">Month</span>
          <span value="overall">Overall</span>
        </SegmentedControl>

        {
          stats.map((stat, index) => {
            return <LeaderboardItem stat={stat} key={index} onClick={() => {this.openDetailStats(stat)}} />    
          })
        }
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weekStats: state.leaderboard.weekStats,
    monthStats: state.leaderboard.monthStats,
    overallStats: state.leaderboard.overallStats,
    period: state.settings.leaderboardPeriod
  }
};

export default connect(mapStateToProps)(Leaderboard);
