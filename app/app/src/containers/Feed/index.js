import React from 'react';
import Promise from 'bluebird'
import {VelocityTransitionGroup} from 'velocity-react'
import {connect} from 'react-redux'
import axios from 'axios'

import Navbar from '../../components/Navbar'
import shouldFetchFeed from '../../actions/feed'
import { authUnlocked } from '../../actions/auth'
import { getForFeed } from '../../api/feed'
import { postComment } from '../../api/comment'
import { createProblem } from '../../api/problem'
import { logRequestError } from '../../api/utils'
import FeedList from '../../components/FeedList';
import CreateProblem from '../../components/Problem/createProblem'
import FeedItemProblem from '../../components/FeedItem/problem'


class Feed extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showCreate: false,
      createButtonText: 'Create Problem',
      feed: [],
      feedData: []
    }

    this.maxFeedItems = 5  // low for testing.
    this.clientUrl = 'ws://dev.feed.devpledge.com:9501'
    this.client = null
    this.defaultClientRefresh = 45000
  }

  componentDidMount() {
    Promise.all([
      // pre actions
      this.props.dispatch(authUnlocked())
    ]).then(() => {
      this.props.dispatch(shouldFetchFeed())
      this.connectToFeed()
      this.persistFeed()
      this.mockPushTimer()
    })
  }

  onClientOpen = () => {
    this.client.send(JSON.stringify({user_id: this.props.auth.user_id, 'function': 'get-feed'}));
  }

  sortFilterResult (newEntries) {
    // this is brutal.  This would be easier if the id field was always id and not [type_id]
    const initialEntities = [...this.state.feedData]  // make copy as not to mutate state
    // filter the old intialEntries and remove any ids which exist in the new array

    // first we need to remove any duplicates from the newEntries... ouch
    const newEntriesFiltered = newEntries.filter((ent, index, self) => {
      const entKey = `${ent.entity.type}_id`
      return self.findIndex(t => t.entity.data[entKey] === ent.entity.data[entKey]) === index
    })

    // now filter again, removing any old entries that have been updated
    const filteredOld = initialEntities.filter(iE =>
      newEntriesFiltered.some(nE => {
        const ieKey = `${iE.entity.type}_id`
        const neKey = `${nE.entity.type}_id`
        return iE.entity.data[ieKey] !== nE.entity.data[neKey]
      })
    )

    const newFiltered = filteredOld.concat(newEntriesFiltered)  // concat the new items to the end of the list
    console.log(initialEntities, newEntriesFiltered, filteredOld, newFiltered)
    return newFiltered
  }

  onClientMessage = msg => {
    const data = JSON.parse(msg.data)
    console.log('RECEIVING UPDATE: onClient Message', msg, data)
    if (data && data.hasOwnProperty('entities')) {  // opens with connection object
      this.setState({
        feed: this.state.feed.concat(data.entities)
      }, () => {
        getForFeed(data).then(res => {
          console.log('GET FOR FEED: response', res)
          this.setState({
            newFeedData: 'New feed data',
            feedData: this.sortFilterResult(res.data.entities)
          })
          setTimeout(() => {
            this.setState({
              newFeedData: null
            })
          }, 3000)
        }).catch(err => logRequestError(err))
      })
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

  mockPushCreateProblem () {
    fetch('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand')
      .then(res => res.json())
      .then(res => {
        createProblem({
          title: res[0].title,
          description: res[0].content,
          specification: res[0].link,
          topics: ['PHP', 'JS']
        }).then(res => {
          console.log('CREATED MOCK PROBLEM', res)
        }).catch(err => logRequestError(err))
      }).catch(err => logRequestError(err))
    // postCreateProblem()
  }

  mockPush = () => {
    // return true
    if (this.state.feed.length) {
      const randomNumberInsideLengthOfArray = Math.floor(Math.random() * this.state.feed.length)
      const randomFeed = this.state.feed[randomNumberInsideLengthOfArray]
      console.log('here is a fandomFeed', randomFeed)
      const randomId = randomFeed.id
      this.testPushNew(randomId)
      /*
      // test push(this.state.feed[randomNumberInsideLenghOfArray]].entity.data.problem_id)
      getForFeed({entities: [this.state.feed[randomNumberInsideLenghOfArray]]}).then(res => {
        this.setState({
          feedData: this.sortFilterResult(res.data.entities)
        })
      }).catch(err => logRequestError(err))
      */
    }
  }

  testPushNew (id) {
    postComment(id, {
      comment: "this is my comment: " + Math.random()
    }).then(res => {
      console.log(res)
    }).catch(err => logRequestError(err))
  }

  mockPushTimer () {
    setInterval(() => {
      // this.mockPush()
    }, 10000)
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
        parent_entity={parent_entity}
      />
    )
  }

  renderFeed () {
    if (! this.state.feedData.length) return 'loading'
    // as demo we will only render the last 3 items on the list.
    // todo this will be updated to rendering more but keep the feed to the bottom of the page
    // as user scrolls min and max values will be updated
    const lastMaxFeedItems = this.state.feedData.slice(0).slice(-this.maxFeedItems)

    console.log(lastMaxFeedItems.length)

    // possible try catch this instead of multiple checks.
    return lastMaxFeedItems.map(item => {
      // console.log('here is the item', item)
      try {
        const { entity } = item
        const type = entity.type
        const renderFnName = `renderFeedType_${type}`
        if (this[renderFnName] && this[renderFnName].constructor === Function) {
          return this[renderFnName](item)
        }
        new Error(`type does not exist or cannot find function for ${type}`)
      } catch (e) {
        console.log(e)  // replace with log
        return this.renderFeedType_fail()
      }
    })
  }

  renderNewItemAlert () {
    if (this.state.newFeedData) return (
      <div className="absolute-feed-alert">
        {this.state.newFeedData}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col col-sm-2">
                <button className="dp-button is-tertiary margin-bottom-15" onClick={this.mockPush}>Add random comment</button>
                <button className="dp-button is-tertiary margin-bottom-15" onClick={this.mockPushCreateProblem}>make problem</button>
              </div>
              <div className="col-sm">
                <div className="feed-list">
                  <ul>
                    {this.renderFeed()}
                  </ul>
                </div>
              </div>
              <div className="col col-sm-2">
                panel 2
                {this.renderNewItemAlert()}
              </div>
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

