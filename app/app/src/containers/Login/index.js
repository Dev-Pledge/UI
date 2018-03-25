import React from 'react';
// import shouldFetchFeed from '../../actions/feed';
import { attemptLogin } from '../../actions/auth'
import { connect } from 'react-redux'

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

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePassChange = (event) => {
    this.setState({password: event.target.value});
  }

  attemptLoginHandler = (e) => {
    e.preventDefault()
    this.setState({
      error: ''
    })
    // todo soft validation
    this.props.dispatch(attemptLogin(this.state.email, this.state.password))
      .then(res => {
        // we had success
        this.setState({
          email: '',
          password: ''
        })
        return this.props.history.push('/feed')
      })
      .catch(res => {
        // we failed login.
        this.setState({
          error: 'login failed - try again arse'
        })
      })
  };

  renderError = () => {
    if (this.state.error) {
      return <div className="text-danger has-text-center">{this.state.error}</div>
    }
  };

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <p>Just hit login for now.  You will be logged in as Big Bill</p>
            <form className="dp-form">
              <input
                className="dp-input"
                type="text"
                placeholder="email address"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <input
                className="dp-input"
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handlePassChange}
              />
              <button className="dp-button is-primary is-block" onClick={this.attemptLoginHandler}>Login</button>
              {this.renderError()}
            </form>
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

