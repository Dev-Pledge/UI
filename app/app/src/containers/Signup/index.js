import React, { Component } from 'react';
import Raven from 'raven-js'

import { logRequestError } from '../../api/utils'
import { checkUserNameAvailable, submitSignup } from '../../api/signup'

class Signup extends Component {

  constructor () {
    super()
    this.state = {
      email: '',
      userName: '',
      password: ''
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
    checkUserNameAvailable({
      username: this.state.userName
    }).then(res => {
      this.setState({
        userNameValid: true
      })
      console.log(res)
    }).catch(err => {
      logRequestError(err)
      this.setState({
        userNameValid: false
      })
    })
  }

  handleUserNameChange = (val) => {
    this.setState({
      userName: val
    }, this.checkUserName)
  }

  handlePasswordChange = (val) => {
    this.setState({
      password: val
    })
  }

  handleSubmit = () =>  {
    submitSignup({
      email: this.state.email,
      username: this.state.userName,
      password: this.state.password
    }).then(res => {
      console.log(res)
    }).catch(err => {
      logRequestError(err)
    })
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
