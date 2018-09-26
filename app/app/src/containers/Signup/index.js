import React, { Component } from 'react'
import Raven from 'raven-js'
import { connect } from 'react-redux'
import { FaCheck, FaTimes, FaGithub } from 'react-icons/fa'

import Navbar from '../../components/Navbar'
import { loginSuccess } from '../../actions/auth'
import { logRequestError } from '../../api/utils'
import { initState } from '../../actions/githubState'
import { checkUserNameAvailable, submitSignup } from '../../api/signup'

class Signup extends Component {

  constructor () {
    super()
    this.state = {
      email: '',
      userName: '',
      password: '',
      userNameAvailable: true,
      emailValidationOn: false,
      userNameValidationOn: false,
      gitHubState: Math.random() + Math.random() + 'foo' + Math.random()  // needs to be set to redux
    }
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  turnValidationOn (prop) {
    this.setState({
      [`${prop}ValidationOn`]: true
    })
  }

  handleEmailChange (email) {
    // todo soft validate
    this.setState({ email })
  }

  checkUserName = () => {
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
    // todo soft validate.  login requires at least 5 chars signup does not
    this.setState({ userName }, this.checkUserName)
  }

  handlePasswordChange = (password) => {
    // todo soft validate.  1 special character, 1 uppercase, 1 number
    this.setState({ password })
  }

  handleSubmit = e =>  {
    e.preventDefault()
    submitSignup({
      email: this.state.email,
      username: this.state.userName,
      password: this.state.password
    }).then(res => {
      this.props.dispatch(loginSuccess(res.data.token))
        .then(res => this.props.history.push('/feed'))
        .catch(err => logRequestError(err))
    }).catch(err => logRequestError(err))
  }

  renderIsUserNameAvailable () {
    if (! this.state.userNameValidationOn) return ''
    if (! this.state.userName.length) return ''
    if (! this.state.userNameAvailable && this.state.userName.length > 4) return (
      <span className="text-danger text-sm">
        User name is not available <FaTimes className="text-danger" />
      </span>
    )
    if (this.state.userName.length < 5) return (
      <span className="text-warning text-sm">
        (Must be at least 5 characters)
      </span>
    )
    return <FaCheck className="text-primary" />
  }

  renderIsPasswordAcceptable () {
    if (! this.state.password) return ''
    const { password } = this.state
    return (
      <div className="text-sm margin-bottom-15">
        <div className="row">
          <div className="col col-10">At least 8 chars</div>
          <div className="col has-text-right">{password.length > 7
            ? <FaCheck className="text-primary" />
            : <FaTimes className="text-danger" />}
          </div>
        </div>
        <div className="row">
          <div className="col col-10">Contains special char (*%!^...)</div>
          <div className="col has-text-right">{password.match(/\W+/g)
            ? <FaCheck className="text-primary" />
            : <FaTimes className="text-danger" />}
          </div>
        </div>
        <div className="row">
          <div className="col col-10">Contains a number</div>
          <div className="col has-text-right">{password.match(/\d/g)
            ? <FaCheck className="text-primary" />
            : <FaTimes className="text-danger" />}
          </div>
        </div>
        <div className="row">
          <div className="col col-10">Contains upper case & lower case</div>
          <div className="col has-text-right">{password.match(/[a-z]/) && password.match(/[A-Z]/)
            ? <FaCheck className="text-primary" />
            : <FaTimes className="text-danger" />}
          </div>
        </div>
      </div>
    )
  }

  renderLooksValidEmail () {
    if (! this.state.emailValidationOn) return ''
    if (/\S+@\S+\.\S+/.test(this.state.email)) return <FaCheck className="text-primary" />
    if (this.state.email.length) return <span className="text-sm text-warning">Your email does not look right <FaTimes className="text-danger" /></span>
  }

  githubRedirect = () => {
    const client_id = "06575840b579f8823caf"
    const redirect_uri = "http://localhost:3000/auth/github"
    this.props.dispatch(initState()).then(githubState => {
      const githubQuery = `client_id=${client_id}&redirect_uri=${redirect_uri}&state=${githubState}`
      window.location.href = 'https://github.com/login/oauth/authorize?' + githubQuery
    })
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 offset-md-4">
                <div className="box is-strong has-shadow">
                  <button onClick={this.githubRedirect} className="dp-button is-block margin-bottom-15">Signup with github <FaGithub /></button>
                  <p className="has-text-center text-muted has-line-container">
                    <span className="has-line">&nbsp;</span>
                    <span className="has-line-text">or by email</span>
                  </p>
                  <p>Your email {this.renderLooksValidEmail()}</p>
                  <form className="dp-form">
                    <input
                      type="text"
                      className="dp-input"
                      placeholder="email"
                      value={this.state.email}
                      onBlur={e => this.turnValidationOn('email')}
                      onChange={e => this.handleEmailChange(e.target.value)}
                    />
                    <p>Your chosen username  {this.renderIsUserNameAvailable()}</p>
                    <input
                      type="text"
                      className="dp-input"
                      placeholder="username"
                      value={this.state.userName}
                      onBlur={e => this.turnValidationOn('userName')}
                      onChange={e => this.handleUserNameChange(e.target.value)}
                    />
                    <p>Your chosen password</p>
                    <input
                      type="password"
                      className="dp-input"
                      placeholder="password"
                      value={this.state.password}
                      onChange={e => this.handlePasswordChange(e.target.value)}
                    />
                    {this.renderIsPasswordAcceptable()}
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
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
    githubState: store.githubState
  }
}

export default connect(mapStateToProps)(Signup);
