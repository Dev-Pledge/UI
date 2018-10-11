import axios from 'axios'
import baseUrls from './config'

export const fetchPublicApiKey = () => {
  return axios.get(`${baseUrls.api}pay/stripe/apiKey`)
}

