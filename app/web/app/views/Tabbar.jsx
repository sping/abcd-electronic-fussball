import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { tabbarIcons } from './../assets/img/tabbar/index';

class Tabbar extends Component {
  constructor (props) {
    super(props);
  }


  tabIcon (icon, active) {
    if (active) {
      icon += 'Active'
    }
    return tabbarIcons[icon]
  }

  render() {
    return (
      <div id="tabbar">
        <Link to="/timeline" activeClassName="active">
          <img src={ this.tabIcon('time', false) } />
          <img className="active-icon" src={ this.tabIcon('time', true) } />
          <span>Timeline</span>
        </Link>

        <Link to="/leaderboard" activeClassName="active">
          <img src={ this.tabIcon('leaderboard', false) } />
          <img className="active-icon" src={ this.tabIcon('leaderboard', true) } />
          <span>Leaderboard</span>
        </Link>

        <Link to="/add-match" activeClassName="active">
          <img src={ this.tabIcon('addMatch', false) } />
          <img className="active-icon" src={ this.tabIcon('addMatch', true) } />
          <span>Add match</span>
        </Link>

        <Link to="/my-stats" activeClassName="active">
          <img src={ this.tabIcon('myStats', false) } />
          <img className="active-icon" src={ this.tabIcon('myStats', true) } />
          <span>My Stats</span>
        </Link>

        <Link to="/account" activeClassName="active">
          <img src={ this.tabIcon('user', false) } />
          <img className="active-icon" src={ this.tabIcon('user', true) } />
          <span>Account</span>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Tabbar);
