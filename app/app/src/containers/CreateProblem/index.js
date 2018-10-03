import React, { Component } from 'react';
import Raven from 'raven-js'
import { connect } from 'react-redux'
import Editor from 'draft-js-plugins-editor';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import draftToMarkdown from 'draftjs-to-markdown';
import { EditorState, convertToRaw } from 'draft-js'
import { Redirect } from 'react-router'
import 'flatpickr/dist/themes/light.css'
import Flatpickr from 'react-flatpickr'
// import { FaCheck } from 'react-icons/fa'
// import { FaTimes } from 'react-icons/fa'

import Navbar from '../../components/Navbar'
import { authUnlocked } from '../../actions/auth'
import { logRequestError } from '../../api/utils'
import { createProblem as postCreateProblem } from '../../api/problem'
import { fetchTopics } from '../../api/topics'
import Loading from '../../components/Loading'
import moment from 'moment'

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
      topicsSelected: [],
      activeDateTime: moment().format()
    }
    this.authOnly = true
    this.redirect = false
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

  handleActiveDateTime = valueArr => {
    this.setState({ activeDateTime: valueArr[0] })
  }

  handleSubmit = e =>  {
    e.preventDefault()
    if (! this.state.description.length) {
      alert('validation coming.  Needs description')
      return;
    }
    if (! this.state.title.length) {
      alert('validation coming.  Needs title')
      return;
    }

    const rawContentState = convertToRaw(this.state.specification.getCurrentContent());
    const rawMarkup = draftToMarkdown(rawContentState);
    if (! rawMarkup.length) {
      alert('validation coming.  Needs specification')
      return;
    }
    postCreateProblem({
      title: this.state.title,
      description: this.state.description,
      specification: rawMarkup,
      active_datetime: moment.utc(this.state.activeDateTime).format('YYYY-MM-DD HH:mm:ss'),
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
                  <p>Problem specification</p>
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
                  <p>When would you like this problem to go live?</p>
                  <Flatpickr className="dp-input" value={this.state.activeDateTime} options={{
                    enableTime: true,
                    altInput: true,
                    altFormat: "F j, Y H:m"
                  }} onChange={val => this.handleActiveDateTime(val)} />


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
