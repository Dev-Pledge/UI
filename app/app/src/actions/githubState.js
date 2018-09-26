import randomString from 'randomstring'

import { storeLocalStorage, removeToken } from '../auth'
const args = ['alphanumeric', 'alphabetic', 'numeric', 'hex']

export const initState = () => {
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
        payload: stateString
      })
      storeLocalStorage(stateString, 'githubState')
      return resolve(stateString)
    })
}

export const resetState = (stateString) => {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch({
        type: 'INIT_STATE',
        payload: stateString
      })
      return resolve()
    })
}

export const clearState = () => {
  return dispatch => {
    removeToken('githubState')
    dispatch({
      type: 'CLEAR_STATE'
    })
  }
}

