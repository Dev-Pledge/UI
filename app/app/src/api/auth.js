import axios from 'axios'
import baseUrls from './config'

export const authPayload = () => {
  return axios.get(baseUrls.auth + 'auth/payload')
};

export const authLogin = (userCredentialsObj) => {
  return axios.post(baseUrls.auth + 'auth/login', userCredentialsObj)
}