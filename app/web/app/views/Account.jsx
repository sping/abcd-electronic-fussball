import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'
import { userStats } from '../actions/userActions';
import constants from '../constants'
import LeaderboardCard from './LeaderboardCard';
import { currentUser } from '../actions/userActions';

class Account extends Component {
  constructor (props) {
    super(props);

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      avatarUrl: this.props.avatarUrl,
      isSaving: false
    }

    this.save = this.save.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  logout () {
    browserHistory.push('/logout')
  }

  componentDidMount () {
    this.setState(this.props.user)
  }

  save () {
    this.setState({isSaving: true});

    var payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      avatarUrl: this.state.avatarUrl
    }

    axios.put('/current_user', payload).then((response) => {
      this.setState({isSaving: false});

      // Set in store
      this.props.dispatch(currentUser(response.data));

      alert('Saved!')
    }).catch((error) => {
      console.log(error);
      this.setState({isSaving: false});
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
      <div id="account" className="app-account">
        <div className="app-account-user-details">
          <img src={this.props.user.avatarUrl || constants.defaultAvatarUrl} />
        </div>

        <div className="app-account-form">
          <input name="firstName" type="text" placeholder="First name" defaultValue={this.props.user.firstName} onChange={this.handleInputChange} />
          <input name="lastName" type="text" placeholder="Last name" defaultValue={this.props.user.lastName} onChange={this.handleInputChange} />
          <input name="avatarUrl" type="text" placeholder="Avatar url" defaultValue={this.props.user.avatarUrl} onChange={this.handleInputChange} />
          <div className="app-account-form-button-bar">
            <a className="button" onClick={this.save} href="#" disabled={this.state.isSaving}>Save</a>
            <a className="button button-clear" onClick={this.logout} href="#">Logout</a>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser
  }
};

export default connect(mapStateToProps)(Account);
