import axios from 'axios'
import baseUrls from './config'

export const postPledge = (problemId, obj) => {
  return axios.post(`${baseUrls.api}problem/${problemId}/pledge`, obj)
}
