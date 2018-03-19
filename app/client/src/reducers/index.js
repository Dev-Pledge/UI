/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import home from './home';
import feed from './feed';
import auth from './auth';
import userInfo from './userInfo';

const reducers = {
  home,
  feed,
  auth,
  userInfo,
  router
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);
