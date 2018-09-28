import React from 'react';
// import shouldFetchFeed from '../../actions/feed';
import { attemptLogin } from '../../actions/auth'
import { connect } from 'react-redux'
import { FaGithub } from 'react-icons/fa'

import { getGithubUrl } from '../../api/githubApi'
import { logRequestError } from '../../api/utils'
import { initState } from '../../actions/githubState'
import Navbar from '../../components/Navbar'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  componentDidMount () {
    // if is logged in redirect to home
  }

  handleEmailChange = email => {
    this.setState({email});
  }

  handlePassChange = password => {
    this.setState({password});
  }

  attemptLoginHandler = (e) => {
    e.preventDefault()
    this.setState({error: ''})
    this.props.dispatch(attemptLogin(this.state.email, this.state.password))
      .then(res => {
        this.setState({
          email: '',
          password: ''
        })
        return this.props.history.push('/feed')
      })
      .catch(err => {
        let error = 'login failed'
        try {
          error = err.response.data.error
        } catch(e) {}
        this.setState({error})
      })
  }

  renderError = () => {
    if (this.state.error) {
      return <p className="text-danger has-text-center">{this.state.error}</p>
    }
  }

  githubRedirect = (e) => {
    e.preventDefault()
    this.props.dispatch(initState()).then(githubState => {
      getGithubUrl(githubState).then(res => {
        window.location.href = res.data.url
      }).catch(err => logRequestError())
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

                  <button onClick={this.githubRedirect} className="dp-button is-block margin-bottom-15">
                    Login with Github <FaGithub />
                  </button>

                  <p className="has-text-center text-muted has-line-container">
                    <span className="has-line">&nbsp;</span>
                    <span className="has-line-text">or Username/Password</span>
                    <span className="has-line">&nbsp;</span>
                  </p>

                  <form className="dp-form">
                    <p>Your Username</p>
                    <input
                      className="dp-input"
                      type="text"
                      placeholder="Username"
                      value={this.state.email}
                      onChange={e => this.handleEmailChange(e.target.value)}
                    />
                    <p>Your Password</p>
                    <input
                      className="dp-input"
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={e => this.handlePassChange(e.target.value)}
                    />
                    <button className="dp-button is-primary is-block" onClick={this.attemptLoginHandler}>Login</button>
                    {this.renderError()}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Login);

