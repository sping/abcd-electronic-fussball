import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './configureStore';

import Routes from './router';
import './stylesheets/app.sass';

let store = configureStore()

// Render it to DOM
ReactDOM.render(
  <Provider store={ store }>
      <Routes />
  </Provider>,
  document.getElementById('root')
);
