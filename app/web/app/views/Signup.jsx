import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'
import { currentUser, logout } from '../actions/userActions';

class Signup extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      isSigninUp: false
    }

    this.signup = this.signup.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  login () {
    browserHistory.push('/login')
  }

  signup () {
    this.setState({isSigninUp: true});
    
    axios.post('/signup', {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }).then((response) => {
      // Set in store
      this.props.dispatch(currentUser(response.data));
      
      // Update authentication headers
      localStorage.setItem('apiToken', response.data.apiToken)
      axios.defaults.headers.common['authorization'] = 'Token token=' + localStorage.getItem('apiToken');

      // Navigate away
      browserHistory.push('/')
    }).catch((error) => {
      console.log(error);
      this.setState({isSigninUp: false});
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
    return (
      <div className="login-form">
        <input name="firstName" type="text" placeholder="First name" value={this.state.firstName} onChange={this.handleInputChange} />
        <input name="lastName" type="text" placeholder="Last name" value={this.state.lastName} onChange={this.handleInputChange} />
        <input name="email" type="text" placeholder="email" value={this.state.email} onChange={this.handleInputChange} />
        <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleInputChange} />
        <div className="button-bar">
          <a className="button" onClick={this.signup} href="#" disabled={this.state.isSigninUp}>Signup</a>
          <a className="button button-clear" onClick={this.login} href="#">I have an account</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Signup);
