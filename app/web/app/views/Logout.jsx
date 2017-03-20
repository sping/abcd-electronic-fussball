import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../axios'

class Logout extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div id="home">
        <h1>Awesomeness by Creative Developerss</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Logout);
