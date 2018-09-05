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
