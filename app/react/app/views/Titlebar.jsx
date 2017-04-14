import React, { Component } from 'react';
import { connect } from 'react-redux'

class Titlebar extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div id="titlebar">
        <h3>{ this.props.title }</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    title: state.titlebar.title
  }
};

export default connect(mapStateToProps)(Titlebar);
