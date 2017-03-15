import React, { Component } from 'react';
import { connect } from 'react-redux'

class NotFound extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div id="not-found">
        <h1>Ben je verdwaald?</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(NotFound);
