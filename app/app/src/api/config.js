const isProduction = process.env.NODE_ENV !== "production"
export default {
    auth: isProduction ? 'https://dev.auth.devpledge.com/' : 'https://dev.auth.devpledge.com/',
    api: isProduction ? 'https://dev.api.devpledge.com/' : 'https://dev.api.devpledge.com/'
}