import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'
import { browserHistory } from 'react-router'

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.login = this.login.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  login () {
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      console.log(response.apiToken)
      browserHistory.push('/')
    }).catch((error) => {
      console.log(error);
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
      <div id="login">
        <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
        <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
        <a className="button" onClick={this.login} href="#">Login</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Login);
