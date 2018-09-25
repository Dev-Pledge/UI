import axios from 'axios'
import baseUrls from './config'

/**
 *
 * @param problemId
 * @returns {AxiosPromise<any>}
 */
export const fetchProblem = problemId => {
    return axios.get(baseUrls.api + 'problem/' + problemId)
}
/**
 *
 * @param username
 * @returns {AxiosPromise<any>}
 */
export const createProblem = (data = {}) => {
    return axios.post(baseUrls.api + 'problem/create', data)
}
/**
 *
 * @param problemId
 * @param data
 * @param topicsArray
 * @returns {AxiosPromise<any>}
 */
export const updateProblem = (problemId, data = {}) => {
    return axios.patch(baseUrls.api + 'problem/' + problemId, data)
}
