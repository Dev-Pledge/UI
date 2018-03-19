/* @flow */

import fp from 'lodash/fp';

import type { Feed, Action } from '../types';

type State = Feed;

const initialState = {
  readyStatus: 'FEED_REQUESTING',
  foo: 'not set yet bar',
  err: null,
  list: []
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'FEED_REQUESTING':
      return fp.assign(state, {
        readyStatus: 'FEED_REQUESTING'
      });
    case 'FEED_FAILURE':
      return fp.assign(state, {
        readyStatus: 'FEED_FAILURE',
        err: action.err
      });
    case 'FEED_SUCCESS':
      return fp.assign(state, {
        readyStatus: 'FEED_SUCCESS',
        list: action.data
      });
    default:
      return state;
  }
};
