import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../axios';
import TimelineCard from './TimelineCard';
import { matches } from '../actions/timelineActions';
import '../stylesheets/views/timeline.sass';

class Timeline extends Component {
  constructor (props) {
    super(props);
  }

  getMatches () {
    axios.get('/matches').then((response) => {
      this.props.dispatch(matches(response.data));
    }).catch((error) => {
      console.log(error)
    })
  }

  componentWillMount () {
    this.getMatches();
  }

  render() {
    return (
      <div className="app-timeline">
        {
          this.props.matches.map((match) => {
            return <TimelineCard match={match} key={match.id} />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.timeline.matches
  }
};

export default connect(mapStateToProps)(Timeline);
