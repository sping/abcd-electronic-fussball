import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineCard from './TimelineCard';
import '../stylesheets/views/timeline-date-collection.sass';

class TimelineDateCollection extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="app-timeline-date-collection">
        <div className="app-timeline-date-collection-seperator">
          <div className="app-timeline-date-collection-seperator-content">
            { this.props.date }
          </div>
        </div>

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
  return { }
};

export default connect(mapStateToProps)(TimelineDateCollection);
