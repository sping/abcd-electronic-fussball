import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'
import SegmentedControl from 'react-segmented-control'
import { userStats } from '../actions/userActions';
import { period as periodAction } from '../actions/settingsActions';
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
      this.props.dispatch(userStats(response.data));
    }).catch((error) => {
      console.log(error);
    })
  }

  componentDidMount () {
    // You would expect to get the data from here, but it actually isn't needed, since the segmentedcontrol fires a setPeriod which gets the playerStats.
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
    if (!this.props.stats) {
      return (<div>Loading..</div>)
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
          <h1>You are {this.textualNumber(this.props.stats.stats[0].ranking)}!</h1>
        </div>
        <div className="app-my-stats-card-row">
          <LeaderboardCard stat={this.props.stats} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stats: state.user.userStats,
    period: state.settings.period
  }
};

export default connect(mapStateToProps)(MyStats);
