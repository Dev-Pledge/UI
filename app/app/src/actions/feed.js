const fetchFeed = () => {
  return dispatch => {
    dispatch({
      type: 'FEED_REQUESTING'
    })

    try {
      // axios request once endpoint exists
      const feed = {
        count: 2,
        data: [
          {
            id: 1,
            time: (new Date()).getTime() / 1000,
            title: 'Here is a nice title',
            content: 'ohhhh a lovely bit of content to wet your whistle',
            type: 'update'
          },
          {
            id: 2,
            time: (new Date()).getTime() / 1000,
            title: 'and another title',
            content: 'oh yer - look at the click bait on that badboy',
            type: 'created'
          },
          {
            id: 3,
            time: (new Date()).getTime() / 1000,
            title: 'once more with feeling',
            content: 'oone more with just a tad more text for shits and giggles - boom boiiiiii',
            type: 'update'
          }
        ]
      }

      dispatch({
        type: 'FEED_SUCCESS',
        payload: {
          data: feed
        }
      })
    } catch (err) {
      dispatch({
        type: 'FEED_FAILURE',
        payload: {
          err: err
        }
      })
    }
  }
}

export const shouldFetchFeed = () => {
  return (dispatch) => {
    dispatch(fetchFeed())
  }
}

export default shouldFetchFeed
