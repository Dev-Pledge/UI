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
        console.log('here is the res', res)
        const body = res.data
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + body.token;
        const decoded = setToken(body.token);
        console.log('here is the decoded', decoded)
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            isLoggedIn: true,
            token: body.token,
            ttr: decoded.ttr * 1000,
            ttl: decoded.ttl * 1000,
            perms: decoded.data.perms,
            username: decoded.data.username,
            name: decoded.data.name,
            decodedToken: decoded
          }
        });
        return resolve()
      }).catch(err => {
        logRequestError(err, 'auth-login')
        dispatch({
          type: 'AUTH_UNAUTHORISED'
        });
        // todo we don't want this error to leak back to component - could contain data we don't want to accidently log out
        // bluebird complains when reject does not have an error object
        return reject(new Error())
      })
    });
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
      const { auth } = getState()
      console.log('authUnlocked test')
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
        return resolve()
      }
      // set default auth on all network requests
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      // check if valid token
      return authPayload().then(res => {
        console.log('here is the res', res)
        // todo ask tom if is authorised on authPayload - please refresh token.
        // and always return the refreshed jwt
        // todo ask tom.  Payload is in different format.  No ttl and ttr
        // payload instead of data.  TBH i prefer the term payload over data
        const decoded = setToken(token);
        dispatch({
          type: 'AUTH_AUTHORISED',
          payload: {
            isLoggedIn: true,
            token,
            ttr: decoded.ttr * 1000,
            ttl: decoded.ttl * 1000,
            perms: decoded.data.perms,
            username: decoded.data.username,
            name: decoded.data.name,
            decodedToken: decoded
          }
        })
        return resolve()
      }).catch(err => {
        logRequestError(err, 'auth-payload')
        setAuth({
          type: 'AUTH_UNAUTHORISED'
        });
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