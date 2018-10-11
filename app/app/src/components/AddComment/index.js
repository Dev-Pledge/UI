import React, { Component } from 'react';
import Raven from 'raven-js'

import { logRequestError } from '../../api/utils'
import { postComment } from '../../api/comment'

class AddComment extends Component {

  constructor () {
    super()
    this.state = {
      comment: '',
      parentId: null
    }
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  componentDidMount () {
    this.setState({
      parentId: this.props.parentId,
    })
  }

  handleCommentChange = value => {
    this.setState({
      comment: value
    })
  }

  validate () {
    // todo - do properly
    if (! this.state.comment) return false
    return true
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (! this.validate()) {
      console.log('failed validation')
      return
    }
    postComment(this.state.parentId, {
      comment: this.state.comment
    }).then(res => {
      this.setState({
        comment: ''
      })
      if (this.props.onSuccess) {
        this.props.onSuccess()
      }
    }).catch(err => logRequestError(err))
  }

  render () {
    return (
      <div>
        <form className="dp-form has-text-right">
          <span className="input-group">
            <input
              type="text"
              className="dp-input"
              placeholder="Add a comment here"
              value={this.state.comment}
              onChange={e => this.handleCommentChange(e.target.value)}
            />
            <button
              className="dp-button is-primary btn-addon"
              onClick={this.handleSubmit}
            >+</button>
          </span>
        </form>
      </div>
    )
  }
}

export default AddComment;
