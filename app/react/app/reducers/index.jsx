import { combineReducers } from 'redux';

import rehydrated from './rehydrated';
import counter from './counter';
import leaderboard from './leaderboard';
import user from './user';
import titlebar from './titlebar';
import timeline from './timeline';
import settings from './settings';

export default function createReducers() {
  return combineReducers({ rehydrated, counter, leaderboard, user, titlebar, timeline, settings });
}
