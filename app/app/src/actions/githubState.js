import randomString from 'randomstring'

import { storeLocalStorage, removeToken } from '../auth'
const args = ['alphanumeric', 'alphabetic', 'numeric', 'hex']

export const initState = (userName = '') => {
  return dispatch =>
    new Promise((resolve, reject) => {
      const stateString = [0,1,2].reduce(acc => {
        const type = args[Math.floor(Math.random() * args.length)]
        return acc + randomString.generate({
            charset: type
          })
      },'')
      dispatch({
        type: 'INIT_STATE',
        payload: {
          stateString,
          userName
        }
      })
      storeLocalStorage(stateString, 'githubState')
      storeLocalStorage(userName, 'githubUserName')
      return resolve(stateString)
    })
}

export const resetState = (stateString, userName) => {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch({
        type: 'INIT_STATE',
        payload: {
          stateString,
          userName
        }
      })
      return resolve()
    })
}

export const clearState = () => {
  return dispatch =>
    new Promise((resolve, reject) => {
      removeToken('githubState')
      removeToken('githubUserName')
      dispatch({
        type: 'CLEAR_STATE'
      })
      return resolve()
    })
}

