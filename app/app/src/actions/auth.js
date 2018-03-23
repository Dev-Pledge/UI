import { getToken, setToken, removeToken } from '../auth'
import Promise from 'bluebird'
import axios from 'axios'

// mock
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3ItMTExLTExMS0xMTEtMTExIiwib3JncyI6WyJvcmctMjIyLTIyMi0yMjItMjIyIiwib3JnLTMzMy0zMzMtMzMzLTMzMyJdLCJ1c2VybmFtZSI6IkJpZyBCaWxsIiwidHRsIjoiMTUyMDE5NzgyMCIsInBlcm1zIjp7InJlc291cmNlTmFtZSI6eyJhY3Rpb24iOnsicmVzdHJpY3Rpb25OYW1lIjpbImFsMSIsInZhbDIiXX19fSwianRpIjoiOTc1MTE5ZDctYjViOS00YWIxLWEyZDAtMTAxMTY1NjY0ZTA2IiwiaWF0IjoxNTIxMjM3ODYwLCJleHAiOjE1MjEyNDE0NjB9.GXPrRoh_yIO_UCztFqHYRWGhGq_NDSlOhzZ9ezUVs9Q';

export const login = (user, pass) => {
  return dispatch => {
    dispatch({ type: 'AUTH_REQUESTING' });
    try {
      // attempt login.  on success set token to headers and data to redux
      const decoded = setToken(token);

      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          isLoggedIn: true,
          token,
          expires: decoded.ttl * 1000,
          username: decoded.username,
          decodedToken: decoded
        }
      });
    } catch (err) {
      // login fail
      dispatch({
        type: 'AUTH_FAIL',
        payload: {
          err: 'testing face'
        }
      })
    }
  }
};

const setAuth = (data) => {
  return dispatch => {
    dispatch(data)
  }
}

/**
 * Check if user is logged in or not.
 * Returns promise to run before other network requests
 * @returns {function(*=, *)}
 */
export const authUnlocked = () => {
  return (dispatch, getState) =>
    new Promise(resolve => {
      // getToken and if exists and set to axios global header
      const { auth } = getState()

      // if redux thinks they are logged in continue
      if (auth.readyStatus === 'AUTH_AUTHORISED') {
        return resolve()
      }

      // could be a page refresh - no redux state but authorised
      if (token) {
        // set default auth on all network requests
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const decoded = setToken(token);
        // validate auth on auth server.  mock for now
        setTimeout(() => {
          // if success
          dispatch({
            type: 'AUTH_AUTHORISED',
            payload: {
              isLoggedIn: true,
              token,
              expires: decoded.ttl * 1000,
              username: decoded.username,
              decodedToken: decoded
            }
          })
          // on fail do when real request is in
          // resolve promise for next
          resolve()
        }, 1000)
      } else {
        // all good just not authorised
        setAuth({
          type: 'AUTH_UNAUTHORISED',
          payload: {}
        });
        // resolve promise for next
        resolve()
      }
    })
};