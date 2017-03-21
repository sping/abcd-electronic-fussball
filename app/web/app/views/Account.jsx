import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'
import { userStats } from '../actions/userActions';
import constants from '../constants'
import LeaderboardCard from './LeaderboardCard';

class Account extends Component {
  constructor (props) {
    super(props);
  }

  logout () {
    browserHistory.push('/logout')
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

  render() {
    if (!this.props.user) {
      return (
        <div>
          Loading..
        </div>
      );
    }
    return (
      <div id="account">
        <div className="place-row">
          <h1>You are 5th!</h1>
        </div>
        <div className="card-row">
          <LeaderboardCard stat={this.props.stats} />
        </div>
        <div className="action-row">
          <a className="button button-clear" onClick={this.logout} href="#">Logout</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    stats: state.user.userStats
  }
};

export default connect(mapStateToProps)(Account);
