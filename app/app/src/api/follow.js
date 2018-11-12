import axios from 'axios'
import baseUrls from './config'

/**
 *
 * @param problemId
 * @returns {AxiosPromise<any>}
 */
export const postFollow = (query = '') => {
  return axios.post(`${baseUrls.api}follow/${query}`)
}

export const deleteFollow = entity_id => {
  return axios.delete(`${baseUrls.api}follow/${entity_id}`)
}

export const fetchFollows = user_id => {
  return axios.get(`${baseUrls.api}/follows/${user_id}`)
}
