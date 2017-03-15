import { combineReducers } from 'redux';

import counter from './counter';

export default function createReducers(reducers) {
  return combineReducers({ counter });
}
