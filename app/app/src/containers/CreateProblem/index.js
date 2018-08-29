import React, { Component } from 'react';
import Raven from 'raven-js'
import { connect } from 'react-redux'
import {Editor, EditorState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { FaCheck } from 'react-icons/fa'
// import { FaTimes } from 'react-icons/fa'

import { logRequestError } from '../../api/utils'
import { createProblem as postCreateProblem } from '../../api/problem'

class CreateProblem extends Component {

  // todo make this just a page wrapper and have a component handle createProblem.  Can call from anywhere then

  constructor () {
    super()
    this.state = {
      title: '',
      description: '',
      specification: EditorState.createEmpty()
    }
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
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
    postCreateProblem({
      // hidden user details
      title: this.state.title,
      description: this.state.description,
      specification: this.state.specification
    }).then(res => {
      console.log('here is the response', res)
    }).catch(err => logRequestError(err))
  }

  render () {
    return (
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
              <p>Problem specification (using draft-js need to add buttons and style etc)</p>
              <Editor editorState={this.state.specification} onChange={this.handleSpecificationChange} />

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
    )
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(CreateProblem);
