import React, { Component } from 'react';
import Raven from 'raven-js'
import throttle from 'lodash/throttle'

import { logRequestError } from '../../api/utils'
import { checkUserNameAvailable, submitSignup } from '../../api/signup'

class Signup extends Component {

  constructor () {
    super()
    this.state = {
      email: '',
      userName: '',
      password: '',
      userNameAvailable: true
    }
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  handleEmailChange (val) {
    this.setState({
      email: val
    })
  }

  checkUserName () {
    console.log('we are calling')
    checkUserNameAvailable({
      username: this.state.userName
    }).then(res => {
      this.setState({
        userNameAvailable: res.data.available
      })
    }).catch(err => {
      logRequestError(err)
    })
  }

  handleUserNameChange = (userName) => {
    this.setState({ userName }, throttle(() => {
        console.log('firing debounce')
        this.checkUserName()
    }, 1000))
  }

  handlePasswordChange = (password) => {
    this.setState({ password })
  }

  handleSubmit = () =>  {
    submitSignup({
      email: this.state.email,
      username: this.state.userName,
      password: this.state.password
    }).then(res => {
      // signup was good.
      // set token via redux
      // redirect to feed
    }).catch(err => {
      logRequestError(err)
    })
  }

  renderIsUserNameAvailable () {
    if (! this.state.userNameAvailable) return (
      <div>User name is not available</div>
    )
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="dp-input"
              placeholder="email"
              value={this.state.email}
              onChange={e => this.handleEmailChange(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="dp-input"
              placeholder="username"
              value={this.state.userName}
              onChange={e => this.handleUserNameChange(e.target.value)}
            />
            {this.renderIsUserNameAvailable()}
          </div>

          <div className="col">
            <input
              type="password"
              className="dp-input"
              placeholder="password"
              value={this.state.password}
              onChange={e => this.handlePasswordChange(e.target.value)}
            />
          </div>
          <div className="col">
            <button
              className="dp-button"
              onClick={this.handleSubmit}
            >Hit me</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
