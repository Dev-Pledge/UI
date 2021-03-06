const initialState = () => ({
  readyStatus: 'AUTH_INITIAL',
  err: null,
  isLoggedIn: false,
  username: '',
  email: '',
  user_id: '',
  ttr: null,
  ttl: null,
  name: '',
  perms: null,
  token: '',
  decodedToken: null
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
        email: null,
        user_id: null,
        isLoggedIn: false,
        username: '',
        ttr: null,
        ttl: null,
        name: '',
        perms: null,
        token: '',
        decodedToken: null
      });
    case 'AUTH_AUTHORISED':
      return Object.assign({}, state, {
        // todo make default on property not exists.
        readyStatus: 'AUTH_AUTHORISED',
        isLoggedIn: true,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        user_id: action.payload.user_id,
        perms: action.payload.perms,
        ttr: action.payload.ttr,
        ttl: action.payload.ttl,
        token: action.payload.token,
        decodedToken: action.payload.decodedToken,
        err: null
      });
    case 'AUTH_UNAUTHORISED':
      return Object.assign({}, state, {
        readyStatus: 'AUTH_UNAUTHORISED',
        email: null,
        user_id: null,
        isLoggedIn: false,
        username: '',
        ttr: null,
        ttl: null,
        name: '',
        perms: null,
        token: '',
        decodedToken: null,
        err: null
      });
    default:
      return state;
  }
}

export default feed