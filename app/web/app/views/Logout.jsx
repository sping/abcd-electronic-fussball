import React, { Component } from 'react';
import { connect } from 'react-redux'
import { currentUser } from '../actions/userActions';
import { browserHistory } from 'react-router'

class Logout extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatch(currentUser(null));
    localStorage.clear();
    browserHistory.push('/login')
  }

  render() {
    return (
      <div id="logout">
        Please wait..
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Logout);
