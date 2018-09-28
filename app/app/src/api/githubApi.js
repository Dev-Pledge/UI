import axios from 'axios'
import baseUrls from './config'

export const postGithubCredentials = postObj => {
  return axios.post(baseUrls.api + 'user/createFromGitHub', postObj)
}

export const postGithubCredentialsLogin = postObj => {
  return axios.post(baseUrls.api + 'auth/githubLogin', postObj)
}

export const getGithubUrl = stateStr => {
  return axios.get(baseUrls.api + 'oauth/github/auth/url/' + stateStr)
}