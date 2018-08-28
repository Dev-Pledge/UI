import axios from 'axios'
import baseUrls from './config'

export const checkUserNameAvailable = (obj = {}) => {
  return axios.post(baseUrls.auth + 'user/checkUsernameAvailability', obj)
}

export const submitSignup = (obj = {}) => {
  return axios.post(baseUrls.auth + 'user/createFromEmailPassword', obj)
}