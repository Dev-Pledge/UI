const initialState = () => ({
  readyStatus: 'AUTH_INITIAL',
  isLoggedIn: false,
  username: '',
  expires: null,
  token: '',
  decodedToken: null,
  err: null
})

const feed = (state = initialState(), action) => {
  switch (action.type) {
    case 'AUTH_REQUESTING':
      return Object.assign({}, state, {
        readyStatus: 'AUTH_REQUESTING'
      });
    case 'AUTH_FAILURE':
      return Object.assign({}, state, {
        readyStatus: 'AUTH_FAILURE',
        err: action.payload.err,
        isLoggedIn: false,
        username: '',
        expires: null,
        token: '',
        decodedToken: null
      });
    case 'AUTH_AUTHORISED':
      return Object.assign({}, state, {
        readyStatus: 'AUTH_AUTHORISED',
        isLoggedIn: true,
        username: action.payload.username,
        expires: action.payload.expires,
        token: action.payload.token,
        decodedToken: action.payload.decodedToken,
        err: null
      });
    case 'AUTH_UNAUTHORISED':
      return Object.assign({}, state, {
        readyStatus: 'AUTH_UNAUTHORISED',
        list: action.payload.data.data,
        isLoggedIn: false,
        username: '',
        expires: null,
        token: '',
        decodedToken: null
      });
    default:
      return state;
  }
}

export default feed