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
        </Link>

        <Link to="/leaderboard" activeClassName="active">
          <img src={ this.tabIcon('leaderboard', false) } />
          <img className="active-icon" src={ this.tabIcon('leaderboard', true) } />
        </Link>

        <Link to="/add-match" activeClassName="active">
          <img src={ this.tabIcon('home', false) } />
          <img className="active-icon" src={ this.tabIcon('home', true) } />
        </Link>

        <Link to="/my-stats" activeClassName="active">
          <img src={ this.tabIcon('home', false) } />
          <img className="active-icon" src={ this.tabIcon('home', true) } />
        </Link>

        <Link to="/account" activeClassName="active">
          <img src={ this.tabIcon('user', false) } />
          <img className="active-icon" src={ this.tabIcon('user', true) } />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Tabbar);
