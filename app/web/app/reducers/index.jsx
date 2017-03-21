import { combineReducers } from 'redux';

import counter from './counter';
import leaderboard from './leaderboard';
import user from './user';
import titlebar from './titlebar';

export default function createReducers() {
  return combineReducers({ counter, leaderboard, user, titlebar });
}
