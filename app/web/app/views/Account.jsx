import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'

class Account extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: null
    }
  }

  getUser () {
    axios.get('/current_user')
    .then((response) => {
      this.setState({user: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentWillMount () {
    this.getUser()
  }

  render() {
    if (!this.state.user) {
      return (
        <div>
          Loading..
        </div>
      );
    }
    return (
      <div id="home">
        <h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Account);
