const isProduction = process.env.NODE_ENV !== "production"
export default {
  auth: isProduction ? 'http://dev.auth.devpledge.com/' : 'http://dev.auth.devpledge.com/'
}