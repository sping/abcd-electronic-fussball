import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'
import SegmentedControl from 'react-segmented-control'
import { userStatsWeek, userStatsMonth, userStatsOverall } from '../actions/userActions';
import { mystatsPeriod as periodAction } from '../actions/settingsActions';
import constants from '../constants'
import LeaderboardCard from './LeaderboardCard';
import '../stylesheets/views/my-stats.sass';

class MyStats extends Component {
  constructor (props) {
    super(props);
  }

  getPlayerStats (period) {
    axios.get('/current_user/stats?period=' + (period || 'overall'))
    .then((response) => {
      switch (period) {
        case 'week':
          this.props.dispatch(userStatsWeek(response.data));
          break;
        case 'month':
          this.props.dispatch(userStatsMonth(response.data));
          break;
        case 'overall':
          this.props.dispatch(userStatsOverall(response.data));
          break;
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  componentDidMount () {
    // You would expect to see getStats() here, but since the SegmentedControl already fires it after the first render, it's ok
  }

  textualNumber (number) {
    var string = number.toString();
    var lastNumber = string[string.length - 1]
    if (lastNumber === '1') {
      return number + 'st'
    } else if (lastNumber === '2') {
      return number + 'nd'
    } else {
      return number + 'th'
    }
  }

  setPeriod (period) {
    this.props.dispatch(periodAction(period));
    this.getPlayerStats(period)
  }

  render() {
    const stats = this.props[this.props.period + 'Stats']
    let ranking;
    if (stats && stats.stats && stats.stats[0]) {
      ranking = stats.stats[0].ranking
    }
    
    return (
      <div className="app-my-stats main-container">
        <SegmentedControl 
          onChange={this.setPeriod.bind(this)} 
          value={this.props.period}
          name="period">
          <span value="week">Week</span>
          <span value="month">Month</span>
          <span value="overall">Overall</span>
        </SegmentedControl>

        <div className="app-my-stats-place-row">
          { ranking &&
            <h1>You are {this.textualNumber(ranking)}!</h1>
          }
        </div>
        <div className="app-my-stats-card-row">
          <LeaderboardCard stat={stats} />
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weekStats: state.user.weekStats,
    monthStats: state.user.monthStats,
    overallStats: state.user.overallStats,

    stats: state.user.userStats,
    period: state.settings.mystatsPeriod
  }
};

export default connect(mapStateToProps)(MyStats);
