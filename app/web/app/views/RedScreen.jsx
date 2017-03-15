import React, { Component } from 'react';
import { connect } from 'react-redux'
import { increment, decrement } from '../actions/myActions';

class RedScreen extends Component {
  constructor (props) {
    super(props);
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment() {
    this.props.dispatch(increment());
  }

  decrement() {
    this.props.dispatch(decrement());
  }

  render() {
    return (
      <div>
        <button className="button button-outline" onClick={this.increment.bind(this)}>Up</button>
        <button className="button button-outline" onClick={this.decrement.bind(this)}>Down</button>
        {this.props.myCounter}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myCounter: state.counter.counter,
  }
};

export default connect(mapStateToProps)(RedScreen);
