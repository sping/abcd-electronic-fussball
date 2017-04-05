import { combineReducers } from 'redux';

import user from './user';

export default function createReducers(reducers) {
  return combineReducers({user});
}
