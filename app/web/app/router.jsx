import React from 'react';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'

import Index from './views/Index';
import Home from './views/Home';
import Alexis from './views/Alexis';
import RedScreen from './views/RedScreen';
import Leaderboard from './views/Leaderboard';
import Account from './views/Account';
import Login from './views/Login';
import Logout from './views/Logout';
import Signup from './views/Signup';
import NotFound from './views/NotFound';

class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/signup" component={Signup} />

              <Route path="/" component={Index}>
                <IndexRedirect to = "home"/>
                <Route path="home" component={Home} />
                <Route path="search" component={RedScreen} />
                <Route path="alexis" component={Alexis} />
                <Route path="leaderboard" component={Leaderboard} />
                <Route path="account" component={Account} />
              </Route>
              <Route path="**" component={NotFound} />
            </Router>
        );
    }
}

export default Routes;
