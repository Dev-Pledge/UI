import React from 'react';
import Promise from 'bluebird'
import {VelocityTransitionGroup} from 'velocity-react'
import {connect} from 'react-redux'

import Navbar from '../../components/Navbar'
import Loading from '../../components/Loading'
import shouldFetchFeed from '../../actions/feed'
import { authUnlocked } from '../../actions/auth'
import { getForFeed } from '../../api/feed'
import { postComment } from '../../api/comment'
import { createProblem } from '../../api/problem'
import { logRequestError } from '../../api/utils'
import FeedList from '../../components/FeedList';
import CreateProblem from '../../components/Problem/createProblem'
import FeedItemProblem from '../../components/FeedItem/problem'
import throttle from 'lodash/throttle'
import uniqBy from 'lodash/uniqBy'


class Feed extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showCreate: false,
      createButtonText: 'Create Problem',
      feedHistoric: [],
      feed: [],
      feedPending: [],
      feedData: [],
      initialLoad: true,
      initiallyLoaded: false,
      heightFromBottom: '-need to scroll'
    }
    this.maxFeedRender = 6
    this.maxFeedItems = 100  // high for now.
    this.clientUrl = 'wss://dev.feed.devpledge.com:9501'
    this.client = null
    this.defaultClientRefresh = 45000
    this.pixelsFromFeedBottom = 350
  }

  componentDidMount() {
    Promise.all([
      this.props.dispatch(authUnlocked())
    ]).then(() => {
      this.props.dispatch(shouldFetchFeed())
      this.connectToFeed()
      this.persistFeed()
    })
  }

  onClientOpen = () => {
    this.client.send(JSON.stringify({user_id: this.props.auth.user_id, 'function': 'get-feed'}));
  }

  sortFilterResult (newEntries) {
    const initialEntities = [...this.state.feedData]  // make copy as not to mutate state
    const filteredOld = initialEntities.filter(iE =>
      newEntries.some(nE => {
        const ieKey = `${iE.entity.type}_id`
        const neKey = `${nE.entity.type}_id`
        return iE.entity.data[ieKey] !== nE.entity.data[neKey]
      })
    )
    const newFiltered = filteredOld.concat(newEntries)  // concat the new items to the end of the list
    setTimeout(() => {
      this.setState({ newFeedData: null })  // reset flash
    }, 5000)
    return newFiltered
  }

  promiseAllEntities () {
    Promise.map(this.state.feed, (entity) => {
      return getForFeed({entities: [{id: entity.parent_id}]}).then(res => {
        if (this.state.includeAlert) {
          // don't know what it is though.  Don't think this feature will last
          // only works for problems, probably.  Could have set action type if we have more descriptive function name - `created-entity` is not enough when we are fetching parents
          // todo: talk to john about it
          this.setState({
            newFeedData: 'New alert: ' + res.data.entities[0].entity.data.title
          })
        }
        return res.data.entities[0]
      }).catch(err => {
        logRequestError(err)
      })
    }).then(res => {
      const newFeedList = this.sortFilterResult(res)
      this.setState({
        includeAlert: false,
        initiallyLoaded: true,
        feedData: newFeedList
      })
    })
  }

  initialLoadHandler (entitiesRaw) {
    const entities = uniqBy(entitiesRaw, 'parent_id')  // dedupe
    const initialFeedEntities = [...entities.slice(0, this.maxFeedRender)]
    const endIndex = entities.length - 1
    const pendingFeedEntities = endIndex >= this.maxFeedRender
      ? [...entities.slice(this.maxFeedRender, endIndex)]
      : []
    this.setState({
      initialLoad: false,
      feed: initialFeedEntities,
      feedPending: pendingFeedEntities
    }, () => {
      this.promiseAllEntities()
    })
  }

  liveMessageHandler (entitiesSanitized) {
    // make sure our pending is unique.  Make sure liveMessages go to the top of the feed
    const newPending = uniqBy(entitiesSanitized.concat(this.state.feedPending), 'parent_id')
    this.setState({
      feedPending: newPending,
      includeAlert: true // turn on alert notification for this next run
    }, () => {
      // if we are passed the threshold to fetch more scroll wise, then get next
      if (this.state.heightFromBottom < this.pixelsFromFeedBottom) {
        this.getNextFeedItems()
      }
    })
  }

  // just make the parent_id always exist to avoid gymnastics
  sanitizeFeed = feed =>
    feed.map(f => Object.assign(f, { parent_id: f.parent_id ? f.parent_id : f.id }))

  onClientMessage = msg => {
    const data = JSON.parse(msg.data)
    console.log('RECEIVING UPDATE: onClient Message', msg, data)
    if (data && data.hasOwnProperty('entities')) {  // opens with connection object
      const entitiesSanitized = this.sanitizeFeed(data.entities)
      if (this.state.initialLoad) {
        this.initialLoadHandler(entitiesSanitized)
        return
      }
      this.liveMessageHandler(entitiesSanitized)
    }
  }

  connectToFeed () {
    this.client = new WebSocket(this.clientUrl)
    this.client.onopen = this.onClientOpen
    this.client.onmessage = this.onClientMessage
    // onclose.  Check an re-establish
  }

  persistFeed () {
    setInterval(() => {
      this.client.send(JSON.stringify({
        user_id: this.props.auth.user_id
      }))
    }, this.defaultClientRefresh)
  }

  getNextFeedItems = () => {
    if (! this.state.initiallyLoaded) return
    if (! this.state.feedPending.length) return
    const nextFeedEntities = [...this.state.feedPending.slice(0, this.maxFeedRender)]
    const endIndex = this.state.feedPending.length - 1
    const pendingFeedEntities = endIndex >= this.maxFeedRender
      ? [...this.state.feedPending.slice(this.maxFeedRender, endIndex)]
      : []
    this.setState({
      feedHistoric: this.state.feedHistoric.concat(this.state.feed), // push old feed items into historic
      feed: nextFeedEntities,
      feedPending: pendingFeedEntities
    }, () => {
      this.promiseAllEntities()
    })
  }

  renderFeedType_fail () {
    // not expected.  prop won't render anything at all
    return (<div key={`not-available-${Math.random()}`}>type not available</div>)
  }

  renderFeedType_problem (item) {
    // todo ofset this to own component
    const { entity, parent_entity } = item  // todo keywords like function cause a bit of an issue in the ol` js
    const { data } = entity
    const idPropName = `${entity.type}_id`
    return (
      <FeedItemProblem
        key={`${data[idPropName]}`}
        data={data}
        child_entity={parent_entity}
      />
    )
  }

  handleFeedScroll = throttle(e => {
    const topOffset = this.feedContainer.offsetHeight // top of feed container offset
    const scrolledTo = this.feedContainer.scrollTop // scrolled in feed container
    const containerHeight = this.feedContainer.scrollHeight // height of feed container
    const heightFromBottom = containerHeight - topOffset - scrolledTo
    this.setState({ heightFromBottom })
    if (heightFromBottom < this.pixelsFromFeedBottom) {
      this.getNextFeedItems()
    }
  }, 150)

  renderFeedContainer () {
    if (! this.state.feedData.length || ! this.state.initiallyLoaded) return (<Loading />)
    return (
      <div
        className="feed-list"
        onScroll={this.handleFeedScroll}
        ref={ref => this.feedContainer = ref}
      >
        <ul>
          {this.renderFeed()}
        </ul>
      </div>
    )
  }

  renderFeed () {
    // possible try catch this instead of multiple checks.
    return this.state.feedData.map(item => {
      try {
        const { entity } = item.parent_entity ? item.parent_entity : item
        const type = entity.type
        const renderFnName = `renderFeedType_${type}`
        if (this[renderFnName] && typeof this[renderFnName] !== 'undefined') {
          return this[renderFnName](item)
        }
        throw new Error(`type does not exist or cannot find function for ${type}`)
      } catch (e) {
        console.log(e)  // replace with log
        return this.renderFeedType_fail()
      }
    })
  }

  renderNewItemAlert () {
    if (this.state.newFeedData) return (
      <div className="feed-footer-alert">{this.state.newFeedData}</div>
    )
  }

  // for tests
  addComment (type) {
    switch (type) {
      case 'feed':
        if (! this.state.feed.length) {
          console.log('THERE WERE NO FEED ITEMS TO ADD A COMMENT TO')
          return
        }
        let randIndex = Math.floor(Math.random() * this.state.feed.length)
        let item = this.state.feed[randIndex]
        postComment(item.parent_id, { comment: 'random comment ' + Math.random() })
          .then(res => console.log(res)).catch(err => logRequestError(err))
        break
      case 'pending':
        if (! this.state.feedPending.length) {
          console.log('THERE WERE NO PENDING ITEMS TO ADD A COMMENT TO')
          return
        }
        let randIndex1 = Math.floor(Math.random() * this.state.feedPending.length)
        let item1 = this.state.feedPending[randIndex1]
        postComment(item1.parent_id, { comment: 'random comment ' + Math.random() })
          .then(res => console.log(res)).catch(err => logRequestError(err))
        break
      case 'historic':
        if (! this.state.feedHistoric.length) {
          console.log('THERE WERE NO Historic ITEMS TO ADD A COMMENT TO')
          return
        }
        let randIndex2 = Math.floor(Math.random() * this.state.feedHistoric.length)
        let item2 = this.state.feedHistoric[randIndex2]
        postComment(item2.parent_id, { comment: 'random comment ' + Math.random() })
          .then(res => console.log(res)).catch(err => logRequestError(err))
        break
      default:
        return
        break
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col col-sm-3">
                <button onClick={() => this.addComment('feed')}>Add a comment to feed problem</button>
                <button onClick={() => this.addComment('historic')}>Add a comment to historic feed item</button>
                <button onClick={() => this.addComment('pending')}>Add a comment to pending feed item</button>
              </div>
              <div className="col-sm">
                {this.renderFeedContainer()}
              </div>
              <div className="col col-sm-3">
                <p>Historic feed: {this.state.feedHistoric.length}</p>
                <p>in feed: {this.state.feed.length}</p>
                <p>in pending feed: {this.state.feedPending.length}</p>
                <p>Fetched feed: {this.state.feedData.length}</p>
                <p>Height from bottom: {this.state.heightFromBottom}</p>
              </div>
            </div>
          </div>
          <div className="feed-footer">
            <div className="">
              {this.renderNewItemAlert()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
    return {
        auth: store.auth,
        feed: store.feed
    }
}

export default connect(mapStateToProps)(Feed);

