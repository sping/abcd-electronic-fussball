import React, { Component } from 'react';
import { connect } from 'react-redux'

class Home extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div id="home">
        <h1>Wie is de mol?</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Home);
