import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'
import { currentUser } from '../actions/userActions';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggingIn: false
    }

    if (localStorage.getItem('apiToken')) {
      browserHistory.push('')
    }
    this.login = this.login.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  signup () {
    browserHistory.push('signup')
  }

  login () {
    this.setState({isLoggingIn: true});
    
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      // Set in store
      this.props.dispatch(currentUser(response.data));
      
      // Update authentication headers
      localStorage.setItem('apiToken', response.data.apiToken)
      axios.defaults.headers.common['authorization'] = 'Token token=' + localStorage.getItem('apiToken');

      // Navigate away
      browserHistory.push('')
    }).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            alert('Credentials not found.');
            break;
          default:
            alert('Something went wrong..')
        }
      } else {
        alert(error)
      }
      this.setState({isLoggingIn: false});
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
        <input name="email" type="text" placeholder="email" value={this.state.email} onChange={this.handleInputChange} />
        <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.handleInputChange} />
        <div className="button-bar">
          <a className="button" onClick={this.login} href="#" disabled={this.state.isLoggingIn}>Login</a>
          <a className="button button-clear" onClick={this.signup} href="#">I need an account</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Login);
