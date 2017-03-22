import React from 'react';
import { connect } from 'react-redux'

import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'

import Index from './views/Index';
import Home from './views/Home';
import Timeline from './views/Timeline';
import Leaderboard from './views/Leaderboard';
import AddMatch from './views/AddMatch';
import MyStats from './views/MyStats';
import Account from './views/Account';
import Login from './views/Login';
import Logout from './views/Logout';
import Signup from './views/Signup';
import NotFound from './views/NotFound';

class Routes extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    if (!this.props.rehydrated) {
      return (
        <div>Loading..</div>
      )
    }

    return (
      <Router history={browserHistory}>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />

        <Route path="/" component={Index}>
          <IndexRedirect to = "timeline"/>
          <Route path="timeline" component={Timeline} />
          <Route path="add-match" component={AddMatch} />
          <Route path="leaderboard" component={Leaderboard} />
          <Route path="my-stats" component={MyStats} />
          <Route path="account" component={Account} />
        </Route>
        <Route path="**" component={NotFound} />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rehydrated: state.rehydrated.finished,
  }
};

export default connect(mapStateToProps)(Routes);
