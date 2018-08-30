import axios from 'axios'
import baseUrls from './config'

export const fetchTopics = () => {
  return axios.get(baseUrls.api + 'list/topics')
}
