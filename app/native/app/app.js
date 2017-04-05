
import React, { Component,
} from 'react';

import {
  AppRegistry,
  View,
} from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import styles from './styles';
import configureStore from './configureStore';

import LoginScreen from './screens/LoginScreen';
import TabbarComponent from './components/TabbarComponent';

class Fussball extends Component {

    constructor() {
        super();
        this.state = {
            store: null
        };
        configureStore((configuredStore) => this.onStoreReady(configuredStore));
    }

    onStoreReady(store) {
        this.setState({
            store,
        });
    }

    render() {
        if (this.state.store === null) {
            return null;
        }

        return (
            <Provider store={this.state.store}>
              <TabbarComponent />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Fussball', () => Fussball);
