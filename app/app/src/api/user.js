import axios from 'axios'
import baseUrls from './config'

export const fetchUser = username => {
  return axios.get(`${baseUrls.api}public/user/${username}`)
}
