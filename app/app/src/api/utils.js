export const logRequestError = (err, reference = 'not registered', exludeStatus = [404, 405]) => {
  // todo replace with sentry
  if (err.response) {
    // that falls out of the range of 2xx
    // if (excludeStatus.includes(err.response.status)) return true
    console.log('request-response-error data', reference, err.response.data);
    console.log('request-response-error status', reference, err.response.status);
    console.log('request-response-error headers', reference, err.response.headers);
  } else if (err.request) {
    // 5**
    console.log('request-request-error-5**', reference, err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('request-request-error', reference, err.message);
  }
  console.log('config', err.config)
}