import axios from 'axios'
import baseUrls from './config'


/**
 *
 * @param username
 * @returns {AxiosPromise<any>}
 */
export const getPublicUserInfoByUsername = (username) => {
    return axios.get(baseUrls.auth + 'public/user/', username)
}
