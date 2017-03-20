import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

import Tabbar from './Tabbar';

class Index extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div id="app">
        <div id="app-content">
          { this.props.children }            
        </div>
        <Tabbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Index);
