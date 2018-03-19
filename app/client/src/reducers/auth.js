/* @flow */

import fp from 'lodash/fp';

import type { Auth, Action } from '../types';

type State = Auth;

const initialState = {
  readyStatus: 'AUTH_REQUESTING',
  isLoggedIn: false,
  err: '', // string for now
  token: '',
  expires: 0,
  username: '',
  jwt: {} // should be null really null or object for truthy falsy
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'AUTH_REQUESTING':
      console.log('!! setting auth requesting');
      return fp.assign(state, {
        readyStatus: 'AUTH_REQUESTING'
      });
    case 'AUTH_SUCCESS':
      console.log('!! setting auth success');
      return fp.assign(state, {
        readyStatus: 'AUTH_SUCCESS',
        isLoggedIn: true,
        token: action.token,
        expires: action.expires,
        username: action.jwt.username,
        jwt: action.jwt
      });
    case 'AUTH_UNAUTHORISED':
      console.log('!! setting auth unauthorised');
      // log out
      return fp.assign(state, {
        readyStatus: 'AUTH_UNAUTHORISED',
        isLoggedIn: false,
        token: '',
        expires: '',
        username: '',
        jwt: {}
      });
    case 'AUTH_FAILURE':
      console.log('!! setting auth failute');
      return fp.assign(state, {
        readyStatus: 'AUTH_FAILURE',
        err: action.err,
        isLoggedIn: false,
        token: '',
        expires: '',
        username: '',
        jwt: {}
      });
    default:
      console.log('!! setting auth default unauthorised');
      return fp.assign(state, {
        readyStatus: 'AUTH_UNAUTHORISED',
        isLoggedIn: false,
        token: '',
        expires: '',
        username: '',
        jwt: {}
      });
  }
};
