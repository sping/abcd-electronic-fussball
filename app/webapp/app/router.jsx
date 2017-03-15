import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import Home from './views/Home';
import Alexis from './views/Alexis';
import NotFound from './views/NotFound';

class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
              <Route path="/" component={Home} />
              <Route path="/alexis" component={Alexis} />
              <Route path="**" component={NotFound} />
            </Router>
        );
    }
}

export default Routes;
