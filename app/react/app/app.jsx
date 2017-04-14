import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './configureStore';

import Routes from './router';
import Tabbar from './views/Tabbar';
import './stylesheets/app.sass';

// Track errors in production env
if (process.env.NODE_ENV === 'production') {
  Raven.config('https://4ef1929be17b4868b4328e552d1451ad@sentry.io/152218').install()
}

// remove 200ms delay on mobile click
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

let store = configureStore()

// Render it to DOM
ReactDOM.render(
    <Provider store={ store }>
      <Routes />
    </Provider>,
    document.getElementById('root')
  );
