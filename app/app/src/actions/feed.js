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
            type: 'pledge',
            hasPledged: false,
            hasCommitted: false,
            time: (new Date()).getTime() / 1000,
            title: 'Just make it work',
            content: 'ohhhh a lovely bit of content to wet your whistle',
            tags: ['php', 'angela'],
            pledge: {
              totalPledges: 541,
              totalPledgesValue: '$1981.43',
              lastPledges: [
                {
                  id: 541,
                  name: 'dave bigballs', // currency supplied by feed - relative to user i guess
                  value: '$20',
                  date: '2018-02-25'
                },
                {
                  id: 540,
                  name: 'ricky bumwhistle', // currency supplied by feed - relative to user i guess
                  value: '$500',
                  date: '2018-02-25'
                },
                {
                  id: 539,
                  name: 'suzan sausage', // currency supplied by feed - relative to user i guess
                  value: '$50',
                  date: '2018-02-25'
                }
              ],
              topPledges: [
                {
                  name: 'sticky vicky',
                  value: '$1000',
                  date: '2018-02-25'
                },
                {
                  name: 'fats domino',
                  value: '$900',
                  date: '2018-02-25'
                },
                {
                  name: 'ugly betty',
                  value: '$660',
                  date: '2018-02-25'
                }
              ]
            }
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
          },
          {
            id: 4,
            type: 'pledge',
            hasPledged: false,
            hasCommitted: true,
            time: (new Date()).getTime() / 1000,
            title: 'Just make it work',
            content: 'another pledge face - that you have said you are providing a solution for',
            tags: ['react', 'webpack', 'redux'],
            pledge: {
              totalPledges: 7,
              totalPledgesValue: '$90.43',
              lastPledges: [
                {
                  id: 541,
                  name: 'dave bigballs', // currency supplied by feed - relative to user i guess
                  value: '$20',
                  date: '2018-02-25'
                },
                {
                  id: 540,
                  name: 'ricky bumwhistle', // currency supplied by feed - relative to user i guess
                  value: '$500',
                  date: '2018-02-25'
                },
                {
                  id: 539,
                  name: 'suzan sausage', // currency supplied by feed - relative to user i guess
                  value: '$50',
                  date: '2018-02-25'
                }
              ]
            }
          },
          {
            id: 6,
            type: 'pledge',
            hasPledged: true,
            hasCommitted: false,
            time: (new Date()).getTime() / 1000,
            title: 'Just make it work',
            content: 'another pledge face - which you have pledged on',
            tags: ['go', 'pain'],
            pledge: {
              totalPledges: 7,
              totalPledgesValue: '$90.43',
              lastPledges: [
                {
                  id: 541,
                  name: 'dave bigballs', // currency supplied by feed - relative to user i guess
                  value: '$20',
                  date: '2018-02-25'
                },
                {
                  id: 540,
                  name: 'ricky bumwhistle', // currency supplied by feed - relative to user i guess
                  value: '$500',
                  date: '2018-02-25'
                },
                {
                  id: 539,
                  name: 'suzan sausage', // currency supplied by feed - relative to user i guess
                  value: '$50',
                  date: '2018-02-25'
                }
              ]
            }
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
