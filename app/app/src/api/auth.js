import axios from 'axios'
import baseUrls from './config'

export const payload = () => {
  return axios.get(baseUrls.auth + 'auth/payload')
};