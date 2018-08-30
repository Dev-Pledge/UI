import { getToken, setToken, removeToken } from '../auth'
import Promise from 'bluebird'
import axios from 'axios'
import { authPayload , authLogin }  from './../api/auth'
import { logRequestError } from './../api/utils'

export const attemptLogin = (username = '', password = '') => {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch({ type: 'AUTH_REQUESTING' });
      return authLogin({
        username, password
      }).then(res => {
        return dispatch(loginSuccess(res.data.token)).then(res => {
          return resolve()
        })
      }).catch(err => {
        logRequestError(err, 'auth-login')
        dispatch({
          type: 'AUTH_UNAUTHORISED'
        });
        // todo we don't want this error to leak back to component - could contain data we don't want to accidently log out
        // bluebird complains when reject does not have an error object
        return reject(new Error({
          message: err.hasOwnProperty('message') ? err.message : 'something went wrong logging in'
        }))
      })
    });
};

export const loginSuccess = (token) => {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      const decoded = setToken(token);
      dispatch({
        type: 'AUTH_AUTHORISED',
        payload: {
          isLoggedIn: true,
          token: token,
          ttr: decoded.ttr * 1000,
          ttl: decoded.ttl * 1000,
          perms: decoded.data.perms,
          email: decoded.data.email,
          user_id: decoded.data.user_id,
          username: decoded.data.username,
          name: decoded.data.name,
          decodedToken: decoded
        }
      });
      return resolve()
    });
}

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
export const authUnlocked = (authOnly = false) => {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      const { auth } = getState()
      // if redux thinks they are logged in continue
      if (auth.readyStatus === 'AUTH_AUTHORISED') {
        return resolve()
      }
      const token = getToken();
      // could be a page refresh - no redux state but authorised
      if (! token) {
        // all good just not authorised
        axios.defaults.headers.common['Authorization'] = '';
        setAuth({
          type: 'AUTH_UNAUTHORISED'
        });
        if (authOnly) {
          return reject()
        }
        return resolve()
      }
      // set default auth on all network requests
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      // check if valid token
      return authPayload().then(res => {
        return dispatch(loginSuccess(token)).then(res => {
          return resolve()
        })
      }).catch(err => {
        axios.defaults.headers.common['Authorization'] = '';
        logRequestError(err, 'auth-payload')
        setAuth({
          type: 'AUTH_UNAUTHORISED'
        });
        if (authOnly) {
          return reject()
        }
        return resolve()
      })
    })
};


export const logout = () => {
  return dispatch =>
    new Promise(resolve => {
      dispatch({ type: 'AUTH_REQUESTING' });
      removeToken()
      // may want a network call
      setTimeout(() => {
        dispatch({
          type: 'AUTH_UNAUTHORISED'
        });
      }, 200)
      return resolve()
    })
}