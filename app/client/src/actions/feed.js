/* @flow */

// import axios from 'axios';

import type { Dispatch, GetState, ThunkAction } from '../types';

// const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Export this for unit testing more easily
/* istanbul ignore next */
export const fetchFeed = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'REQUESTING_FEED', foo: 'bar' });

  try {
    dispatch({
      type: 'FEED_SUCCESS',
      foo: 'bar',
      data: [
        {
          id: 1,
          problem: `STATE: one redux problem, its a great problem`,
          activity: 'created'
        },
        {
          id: 2,
          problem: 'A new comment on a pedge you made',
          activity: 'update'
        },
        {
          id: 3,
          problem:
            'one redux problem was just created we think you may be interested in',
          activity: 'created'
        }
      ]
    });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'FEED_FAILURE', foo: 'bar', err: 'testing face' });
  }
};

/* istanbul ignore next */
export const shouldFetchFeed = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  console.log('shouldFetchFeed');
  if (getState().auth.readyStatus === 'AUTH_REQUESTING') {
    setTimeout(() => {
      shouldFetchFeed();
    }, 200);
  }

  /* istanbul ignore next */
  return fetchFeed(getState());
};

export const bar = () => {
  console.log('bar');
};
