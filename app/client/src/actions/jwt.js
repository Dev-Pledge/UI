/* @flow */

// import axios from 'axios';
import {
  get as getAuthCookie,
  set as setAuthCookie,
  remove as removeAuthCookie
} from '../auth/jwt';

// import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';
import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

// const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const login = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'AUTH_REQUESTING' });

  try {
    // unlock requests on pass or fail
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3ItMTExLTExMS0xMTEtMTExIiwib3JncyI6WyJvcmctMjIyLTIyMi0yMjItMjIyIiwib3JnLTMzMy0zMzMtMzMzLTMzMyJdLCJ1c2VybmFtZSI6IkJpZyBCaWxsIiwidHRsIjoiMTUyMDE5NzgyMCIsInBlcm1zIjp7InJlc291cmNlTmFtZSI6eyJhY3Rpb24iOnsicmVzdHJpY3Rpb25OYW1lIjpbImFsMSIsInZhbDIiXX19fSwianRpIjoiOTc1MTE5ZDctYjViOS00YWIxLWEyZDAtMTAxMTY1NjY0ZTA2IiwiaWF0IjoxNTIxMjM3ODYwLCJleHAiOjE1MjEyNDE0NjB9.GXPrRoh_yIO_UCztFqHYRWGhGq_NDSlOhzZ9ezUVs9Q';
    // jwt would be encoded, mocking for now
    const decoded = setAuthCookie(token);

    console.log('we are setting the JWT for success');

    dispatch({
      type: 'AUTH_SUCCESS',
      token,
      expires: +decoded.ttl * 1000,
      jwt: decoded
    });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'AUTH_FAIL', err: 'testing face' });
    // logged out prompt poss.  would you like to log in
  }
};

// Export this for unit testing more easily
/* istanbul ignore next */
export const refreshJwt = (): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type: 'AUTH_REQUESTING' });
  // todo this should lock all poss auth requests until complete IE feed, createPledge etc

  try {
    // unlock requests on pass or fail
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3ItMTExLTExMS0xMTEtMTExIiwib3JncyI6WyJvcmctMjIyLTIyMi0yMjItMjIyIiwib3JnLTMzMy0zMzMtMzMzLTMzMyJdLCJ1c2VybmFtZSI6IkJpZyBCaWxsIiwidHRsIjoiMTUyMDE5NzgyMCIsInBlcm1zIjp7InJlc291cmNlTmFtZSI6eyJhY3Rpb24iOnsicmVzdHJpY3Rpb25OYW1lIjpbImFsMSIsInZhbDIiXX19fSwianRpIjoiOTc1MTE5ZDctYjViOS00YWIxLWEyZDAtMTAxMTY1NjY0ZTA2IiwiaWF0IjoxNTIxMjM3ODYwLCJleHAiOjE1MjEyNDE0NjB9.GXPrRoh_yIO_UCztFqHYRWGhGq_NDSlOhzZ9ezUVs9Q';
    // jwt would be encoded, mocking for now
    const decoded = setAuthCookie(token);

    console.log('we are setting the JWT for success');

    dispatch({
      type: 'AUTH_SUCCESS',
      token,
      expires: +decoded.ttl * 1000,
      jwt: decoded
    });
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: 'AUTH_FAIL', err: 'testing face' });
    // logged out prompt poss.  would you like to log in
  }
};

/* istanbul ignore next */
export const setAuth = (type): ThunkAction => async (dispatch: Dispatch) => {
  dispatch({ type });
};

/* istanbul ignore next */
const shouldBeLoggedIn = (): boolean => !!getAuthCookie();

/* istanbul ignore next */
const shouldRefreshFetchJwt = (state: ReduxState): boolean => {
  // In development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  console.log('we are checking if we should refresh JWT');
  // if (__DEV__) return true;
  const token = getAuthCookie();

  if (!token) {
    // they are not logged in
    console.log('we did not have a token');
    return false;
  }

  console.log(state.auth);
  /*
  if (state.isLoggedIn && state.auth.expiry > new Date().getUTCMilliseconds()) {
    // if they are logged in read from redux to see if ttl is in date
    console.log('token was in date - no need to refresh');
    return false;
  }
  */

  return true;
};

/* istanbul ignore next */
export const fetchJwtIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  console.log('calling JWT if needed');
  if (!shouldBeLoggedIn()) {
    console.log('we are setting unathorsied as we could not find cookie');
    return dispatch(setAuth('AUTH_UNAUTHORISED'));
  }
  /* istanbul ignore next */
  if (shouldRefreshFetchJwt(getState())) {
    /* istanbul ignore next */
    return dispatch(refreshJwt());
  }

  /* istanbul ignore next */
  return null;
};

/* istanbul ignore next */
export const attemptLogin = (): ThunkAction => (dispatch: Dispatch) => {
  console.log('WE ARE ATTEMPTING A LOGIN');
  return dispatch(login());
};

export const logout = (): ThunkAction => (dispatch: Dispatch) => {
  console.log('WE ARE ATTEMPTING A LOGOUT');
  removeAuthCookie();
  return dispatch(setAuth('AUTH_UNAUTHORISED'));
};
