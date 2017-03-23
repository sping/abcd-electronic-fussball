import { combineReducers } from 'redux';

import counter from './counter';
import user from './user';

export default function createReducers(reducers) {
  return combineReducers({counter, user});
}
