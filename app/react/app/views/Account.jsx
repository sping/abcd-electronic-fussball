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
      isSaving: false,
      hasSaved: false
    }

    this.save = this.save.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  logout () {
    browserHistory.push('logout')
  }

  getUser () {
    axios.get('/current_user')
    .then((response) => {
      this.props.dispatch(currentUser(response.data));
      this.setState({user: response.data})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount () {
    this.getUser()
  }

  save () {
    this.setState({isSaving: true});

    var payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      avatarUrl: this.state.avatarUrl
    }

    axios.put('/current_user', payload).then((response) => {
      this.setState({isSaving: false, hasSaved: true});

      setTimeout(() => {
        this.setState({hasSaved: false});
      }, 3000)

      // Set in store
      this.props.dispatch(currentUser(response.data));
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
    if (!this.state.user) {
      return (
        <div>
        </div>
      );
    }

    return (
      <div id="account" className="app-account main-container">
        <div className="app-account-user-details">
          <div className="app-account-avatar">
            <img src={this.state.user.avatarUrl || constants.defaultAvatarUrl} />
          </div>
        </div>

        <div className="app-account-form">
          <input name="firstName" type="text" placeholder="First name" defaultValue={this.state.user.firstName} onChange={this.handleInputChange} />
          <input name="lastName" type="text" placeholder="Last name" defaultValue={this.state.user.lastName} onChange={this.handleInputChange} />
          <input name="avatarUrl" type="text" placeholder="Avatar url" defaultValue={this.state.user.avatarUrl} onChange={this.handleInputChange} />
          <div className="app-account-form-button-bar">
            <a className="button" onClick={this.save} disabled={this.state.isSaving || this.state.hasSaved}>{this.state.hasSaved ? 'Saved!' : 'Save'}</a>
            <a className="button button-clear" onClick={this.logout}>Logout</a>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Account);
