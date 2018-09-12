import axios from 'axios'
import baseUrls from './config'

export const postComment = (id, postObj) => {
  return axios.post(`${baseUrls.api}comment/${id}`, postObj)
}
