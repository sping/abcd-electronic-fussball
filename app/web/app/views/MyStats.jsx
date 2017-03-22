import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'
import { userStats } from '../actions/userActions';
import constants from '../constants'
import LeaderboardCard from './LeaderboardCard';
import '../stylesheets/views/my-stats.sass';

class MyStats extends Component {
  constructor (props) {
    super(props);
  }

  getPlayerStats () {
    axios.get('/current_user/stats').then((response) => {
      this.props.dispatch(userStats(response.data));
    }).catch((error) => {
      console.log(error);
    })
  }

  componentWillMount () {
    this.getPlayerStats()
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

  render() {
    if (!this.props.stats) {
      return (<div>Loading..</div>)
    }

    return (
      <div className="app-my-stats">
        <div className="app-my-stats-place-row">
          <h1>You are {this.textualNumber(this.props.stats.stat.ranking)}!</h1>
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
    stats: state.user.userStats
  }
};

export default connect(mapStateToProps)(MyStats);
