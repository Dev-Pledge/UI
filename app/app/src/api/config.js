const isProduction = process.env.NODE_ENV !== "production"
export default {
    auth: isProduction ? 'http://dev.auth.devpledge.com/' : 'http://dev.auth.devpledge.com/',
    api: isProduction ? 'http://dev.api.devpledge.com/' : 'http://dev.api.devpledge.com/'
}