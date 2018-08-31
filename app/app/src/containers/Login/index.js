import React from 'react';
// import shouldFetchFeed from '../../actions/feed';
import { attemptLogin } from '../../actions/auth'
import { connect } from 'react-redux'

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
  };

  render () {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <form className="dp-form">
                  <p>Your username</p>
                  <input
                    className="dp-input"
                    type="text"
                    placeholder="username"
                    value={this.state.email}
                    onChange={e => this.handleEmailChange(e.target.value)}
                  />
                  <p>Your password</p>
                  <input
                    className="dp-input"
                    type="password"
                    placeholder="password"
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
    );
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Login);

