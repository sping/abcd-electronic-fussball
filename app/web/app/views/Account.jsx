import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'

class Account extends Component {
  constructor (props) {
    super(props);
  }

  logout () {
    browserHistory.push('/logout')
  }

  getUser () {
    axios.get('/current_user')
    .then((response) => {
      if (response) {
        this.setState({user: response.data})
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentWillMount () {
    this.getUser()
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
        <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
        <a className="button button-clear" onClick={this.logout} href="#">Logout</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  }
};

export default connect(mapStateToProps)(Account);
