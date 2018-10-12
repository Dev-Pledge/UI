import axios from 'axios'
import baseUrls from './config'
// todo needs to send credentils live

export const fetchPublicApiKey = () => {
  return axios.get(`${baseUrls.api}pay/stripe/apiKey`)
}

export const postPayment = (pledgeId, stripeToken) => {
  return axios.post(`${baseUrls.api}pay/pledge/${pledgeId}/stripeToken`, {
    token: stripeToken
  })
}


