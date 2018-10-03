import React, { Component } from 'react';
import Raven from 'raven-js'
import { Redirect } from 'react-router'

import { logRequestError } from '../../api/utils'
import { addSolution as postAddSolution } from '../../api/problem'

class AddSolution extends Component {

  constructor () {
    super()
    this.state = {
      name: '',
      repoLink: '',
      problem_id: null
    }
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  componentDidMount () {
    this.setState({
      problem_id: this.props.problem_id
    })
  }

  handleNameChange = value => {
    this.setState({
      name: value
    })
  }

  handleRepoLinkChange = value => {
    this.setState({
      repoLink: value
    })
  }

  validate () {
    // todo - do properly
    if (! this.state.name || ! this.state.repoLink) return false
    return true
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (! this.validate()) {
      console.log('failed validation')
      return
    }
    postAddSolution(this.state.problem_id, {
        name: this.state.name,
        open_source_location: this.state.repoLink
      }).then(res => {
        if (this.props.onSuccess) {
          this.props.onSuccess()
          this.setState({
            name: '',
            repoLink: '',
          })
        }
      }).catch(err => logRequestError(err))
  }

  render () {
    return (
      <div>
        <form className="dp-form">
          <p>Give a name to your solution</p>
          <input
            type="text"
            className="dp-input"
            placeholder="name"
            value={this.state.name}
            onChange={e => this.handleNameChange(e.target.value)}
          />
          <p>Give a link to your solution (github)</p>
          <input
            type="text"
            className="dp-input"
            placeholder="link"
            value={this.state.repoLink}
            onChange={e => this.handleRepoLinkChange(e.target.value)}
          />
          <button
            className="dp-button is-primary is-block"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default AddSolution;
