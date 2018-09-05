import React from 'react';
import Promise from 'bluebird'
import {VelocityTransitionGroup} from 'velocity-react'
import {connect} from 'react-redux'

import Navbar from '../../components/Navbar'
import shouldFetchFeed from '../../actions/feed'
import { authUnlocked } from '../../actions/auth'
import { getForFeed } from '../../api/feed'
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
      feedData: []
    }

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
    })
  }

  onClientOpen = () => {
    this.client.send(JSON.stringify({user_id: this.props.auth.user_id, 'function': 'get-feed'}));
  }

  onClientMessage = msg => {
    const data = JSON.parse(msg.data)
    console.log('message is here', msg, msg.data, data)
    getForFeed(data).then(res => {
      console.log(res)
      this.setState({
        feedData: res.data.entities
      })
    }).catch(err => logRequestError(err))
  }

  connectToFeed () {
    this.client = new WebSocket(this.clientUrl)
    this.client.onopen = this.onClientOpen
    this.client.onmessage = this.onClientMessage
  }

  persistFeed () {
    setInterval(() => {
      this.client.send(JSON.stringify({
        user_id: this.props.auth.user_id
      }))
    }, this.defaultClientRefresh)
  }

  renderFeedType_fail () {
    // not expected.  prop won't render anything at all
    return (<div key={`not-available-${Math.random()}`}>type not available</div>)
  }

  renderFeedType_problem (item) {
    // todo ofset this to own component
    const { entity, parent_entity } = item  // todo keywords like function cause a bit of an issue in the ol` js
    const { data } = entity
    console.log('data face', data)
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
    // possible try catch this instead of multiple checks.
    return this.state.feedData.map(item => {
      console.log('here is the item', item)
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

  render() {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col col-sm-2">
                panel 1
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

