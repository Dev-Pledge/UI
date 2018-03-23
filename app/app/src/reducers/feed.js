const initialState = () => ({
  readyStatus: 'FEED_REQUESTING',
  error: null,
  list: []
})

const feed = (state = initialState(), action) => {
  switch (action.type) {
    case 'FEED_REQUESTING':
      return Object.assign({}, state, {
        readyStatus: 'FEED_REQUESTING',
        err: null
      });
    case 'FEED_FAILURE':
      return Object.assign({}, state, {
        readyStatus: 'FEED_FAILURE',
        err: action.payload.err
      });
    case 'FEED_SUCCESS':
      return Object.assign({}, state, {
        readyStatus: 'FEED_SUCCESS',
        list: action.payload.data.data,
        err: null
      });
    default:
      return state;
  }
}

export default feed