import axios from 'axios'
import baseUrls from './config'

export const getForFeed = (json) => {
  return axios.post(baseUrls.api + 'entity/getForFeed', json)
}
