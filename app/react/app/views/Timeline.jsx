import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import groupArray from 'group-array'
import axios from '../axios';
import TimelineDateCollection from './TimelineDateCollection';
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

  groupMatchesByDate (matches) {
    for (let match of matches) {
      match.playedAtDate = moment(match.playedAt).format('D/M/YYYY')
    }

    return groupArray(matches, 'playedAtDate')
  }

  render() {
    let groupedMatches = this.groupMatchesByDate(this.props.matches)

    return (
      <div className="app-timeline main-container">
        { 
          Object.keys(groupedMatches).map((key) => {
            return <TimelineDateCollection key={key} date={key} matches={groupedMatches[key]} />
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
