import React from 'react'
import { connect } from 'react-redux'
import * as qs from 'query-string'

import { getToken } from '../../auth'
import { resetState, clearState } from '../../actions/githubState'
import { postGithubCredentials } from '../../api/githubApi'
import { logRequestError } from '../../api/utils'
import { loginSuccess } from '../../actions/auth'

class GithubAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      qs: null,
      githubState: null,
      userName: null
    };
  }

  componentDidMount () {
    this.setState({
      queryParams: qs.parse(this.props.location.search),
      githubState: getToken('githubState'),
      userName: getToken('githubUserName')
    }, this.firstStageAuth)
  }

  firstStageAuth () {
    const { githubState, queryParams, userName } = this.state
    this.props.dispatch(resetState(githubState)).then(() => {
      // cannot use hasOwnProperty on query-string objects
      if (! queryParams.state
        || queryParams.state !== githubState
        || ! queryParams.code
        || ! userName
      ) {
        alert('we are redirecting you as state ' + queryParams.state + ' \n\n ' + githubState + ' \n\ndid not match')
      } else {
        this.requestFinalAuth()
      }
    })
  }

  requestFinalAuth () {
    postGithubCredentials({
      code: this.state.queryParams.code,
      state: this.state.githubState,
      username: this.state.userName
    }).then(res => {
      this.props.dispatch(loginSuccess(res.data.token))
        .then(res => {
          this.props.dispatch(clearState()).then(res => {
            this.props.history.push('/feed')
          }) // no catch required
        }).catch(err => logRequestError(err))
    }).catch(err => logRequestError(err))
  }
  
  render () {
    return (
      <div>
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <p className="has-text-center">Authorising</p>
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

export default connect(mapStateToProps)(GithubAuth);

