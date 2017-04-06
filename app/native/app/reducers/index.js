import { combineReducers } from 'redux';

import user from './user';
import { tabBarReducer } from '../navigation/NavigationConfiguration';

export default function createReducers(reducers) {
  return combineReducers({
    user,tabBarReducer,
  });
}
