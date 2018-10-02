import React, { Component } from 'react';
import Raven from 'raven-js'
import { connect } from 'react-redux'
import { Editor, EditorState } from 'draft-js'
import { Redirect } from 'react-router'

import Navbar from '../../components/Navbar'
import { authUnlocked } from '../../actions/auth'
import { postFollow } from '../../api/follow'
import { logRequestError } from '../../api/utils'
import { fetchTopics } from '../../api/topics'
import Loading from '../../components/Loading'

class Preferences extends Component {

  // todo make this just a page wrapper and have a component handle createProblem.  Can call from anywhere then

  constructor () {
    super()
    this.state = {
      title: '',
      description: '',
      specification: '', // EditorState.createEmpty(),
      topics: [],
      topicsSelected: []
    }
    this.authOnly = true
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  componentDidMount () {
    this.props.dispatch(authUnlocked(this.authOnly))
      .then(() => {
        this.getTopics()
      }).catch(err => {
        this.props.history.push({
          pathname:"/login",
          state: 'You need to be logged in to do that'
        })
      })
  }

  getTopics () {
    fetchTopics().then(res => {
      this.setState({
        topics: res.data.topics
      })
    }).catch(err => logRequestError(err))
  }

  topicClick = (topic_id, isRemove) => {
    postFollow(topic_id).then(res => {
      console.log(res)
    }).catch(err => logRequestError(err))
    this.setState({
      topicsSelected: isRemove
        ? this.state.topicsSelected.filter(item => item !== topic_id)
        : this.state.topicsSelected.concat(topic_id)
    })
  }

  renderTopics () {
    if (! this.state.topics.length) return <Loading />
    return this.state.topics.map(topic => {
      const hasTopic = this.state.topicsSelected.includes(topic.topic_id)
      return (
        <span
          key={topic.topic_id}
          className={hasTopic ? 'tag is-primary with-fill has-cursor-pointer' : 'tag has-cursor-pointer'}
          onClick={() => this.topicClick(topic.topic_id, hasTopic)}
        >{topic.name}
        </span>
      )
    })
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <p>Preferences</p>


                <p>Select relevant topics to your problem</p>
                <div className="margin-bottom-15 tags">
                  {this.renderTopics()}
                </div>

                <button
                  className="dp-button is-primary is-block"
                  onClick={this.handleSubmit}
                >
                  Watch those badboys
                </button>
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
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Preferences);
