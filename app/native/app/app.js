
import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import styles from './styles';
import Counter from './screens/Counter';
import configureStore from './configureStore';

import Routes from './router';

class CounterApp extends Component {

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
                <Routes />
            </Provider>
        );
    }
}

export default CounterApp;
