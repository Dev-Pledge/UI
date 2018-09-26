import React, { Component } from 'react';
import Raven from 'raven-js'
import { connect } from 'react-redux'
import Editor from 'draft-js-plugins-editor';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import { EditorState, convertToRaw } from 'draft-js'
// import { FaCheck } from 'react-icons/fa'
// import { FaTimes } from 'react-icons/fa'

import Navbar from '../../components/Navbar'
import { authUnlocked } from '../../actions/auth'
import { logRequestError } from '../../api/utils'
import { createProblem as postCreateProblem } from '../../api/problem'
import { fetchTopics } from '../../api/topics'
import Loading from '../../components/Loading'

const plugins = [
  createMarkdownShortcutsPlugin()
]

class CreateProblem extends Component {

  // todo make this just a page wrapper and have a component handle createProblem.  Can call from anywhere then

  constructor () {
    super()
    this.state = {
      title: '',
      description: '',
      specification: EditorState.createEmpty(),
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
        alert('you are not authorised for this.  Should really redirect you to signup. after setting some flash alert')
        this.props.history.push('/signup')
      })
  }

  handleTitleChange (title) {
    // todo soft validate
    this.setState({ title })
  }

  handleDescriptionChange = (description) => {
    // todo soft validate.
    this.setState({ description })
  }

  handleSpecificationChange = (specification) => {
    // todo soft validate.
    this.setState({ specification })
  }

  handleSubmit = e =>  {
    e.preventDefault()
    if (! this.state.topicsSelected.length) {
      alert('validation coming.  You must select at least 1 topic')
      return;
    }
    if (! this.state.description.length) {
      alert('validation coming.  Needs description')
      return;
    }
    if (! this.state.title.length) {
      alert('validation coming.  Needs title')
      return;
    }
    if (! this.state.specification.length) {
      alert('validation coming.  Needs title')
      return;
    }
    postCreateProblem({
      title: this.state.title,
      description: this.state.description,
      specification: this.state.specification,
      topics: this.state.topicsSelected
    }).then(res => {
      alert('success!!!! may be redirect to feed, or this finalised problem to review')
      console.log('here is the response', res)
    }).catch(err => logRequestError(err))
  }

  getTopics () {
    fetchTopics().then(res => {
      this.setState({
        topics: res.data.topics
      })
    }).catch(err => logRequestError(err))
  }

  topicClick = (topic, isRemove) => {
    this.setState({
      topicsSelected: isRemove
        ? this.state.topicsSelected.filter(item => item !== topic)
        : this.state.topicsSelected.concat(topic)
    })
  }

  renderTopics () {
    if (! this.state.topics.length) return <Loading />
    return this.state.topics.map(topic => {
      const hasTopic = this.state.topicsSelected.includes(topic.name)
      return (
        <span
          key={topic.topic_id}
          className={hasTopic ? 'tag is-primary with-fill has-cursor-pointer' : 'tag has-cursor-pointer'}
          onClick={() => this.topicClick(topic.name, hasTopic)}
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
                <p>Problem title</p>
                <form className="dp-form">
                  <input
                    type="text"
                    className="dp-input"
                    placeholder="title"
                    value={this.state.title}
                    onChange={e => this.handleTitleChange(e.target.value)}
                  />
                  <p>Problem description</p>
                  <input
                    type="text"
                    className="dp-input"
                    placeholder="description"
                    value={this.state.description}
                    onChange={e => this.handleDescriptionChange(e.target.value)}
                  />
                  <p>Problem specification (draft-js on hold)</p>
                  {<Editor
                    editorState={this.state.specification}
                    onChange={this.handleSpecificationChange}
                    plugins={plugins}
                  />}
                  {/*<input
                    type="text"
                    className="dp-input"
                    placeholder="spec"
                    value={this.state.specification}
                    onChange={e => this.handleSpecificationChange(e.target.value)}
                  />*/}

                  <p>Select relevant topics to your problem</p>
                  <div className="margin-bottom-15 tags">
                    {this.renderTopics()}
                  </div>

                  <button
                    className="dp-button is-primary is-block"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </form>
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

export default connect(mapStateToProps)(CreateProblem);
