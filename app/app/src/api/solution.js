import axios from 'axios'
import baseUrls from './config'

export const fetchSolution = solution_id => {
  return axios.get(`${baseUrls.api}solution/${solution_id}`)
}
