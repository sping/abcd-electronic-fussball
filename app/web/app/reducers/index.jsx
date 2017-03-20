import { combineReducers } from 'redux';

import counter from './counter';
import leaderboard from './leaderboard';

export default function createReducers(reducers) {
  return combineReducers({ counter, leaderboard });
}
