import axios from 'axios'
import baseUrls from './config'

export const postComment = (id, postObj) => {
  return axios.post(`${baseUrls.api}comment/${id}`, postObj)
}

export const fetchComments = entity_id => {
  return axios.get(`${baseUrls.api}comments/${entity_id}`)
}
