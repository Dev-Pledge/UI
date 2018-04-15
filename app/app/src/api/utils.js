import Raven from 'raven-js'
import { propOrDefault } from '../utils'

export const logRequestError = (err, reference, config = {}) => {
  const excludeStatus = propOrDefault(config, 'excludeStatus', [])  // todo laters replace default with [401, 403, 404]
  const extraContext = propOrDefault(config, 'extraContext', {})
  if (err.response) {
    // that falls out of the range of 2xx Basically 400s.  500s caught below
    // many exceptions are legitimate - IE 404 and 401 may be expected.  Don't flood sentry :)
    if (excludeStatus.includes(err.response.status)) return true
    Raven.captureMessage(reference + '_' + err.response.status, {
      level: 'info',
      extra: Object.assign({}, { response: err.response, reference }, extraContext)
    });
  } else if (err.request) {
    Raven.captureMessage(reference + '_5xx', {
      level: 'warning',
      extra: Object.assign({}, { response: err.response, reference }, extraContext)
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    Raven.captureException(err,  Object.assign({}, { message: err.message, reference }, extraContext));
  }
  // for dev only todo remove soon
  console.log('config', err.config)
}