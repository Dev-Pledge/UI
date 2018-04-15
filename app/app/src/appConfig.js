const isProduction = process.env.NODE_ENV !== "production"
export default {
  ravenDSN: isProduction ? 'http://68a884151f4245ec93af3e08ce53df02@dev.errors.devpledge.com/2' : 'http://68a884151f4245ec93af3e08ce53df02@dev.errors.devpledge.com/2'
}