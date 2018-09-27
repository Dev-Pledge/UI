import React from 'react'
import { connect } from 'react-redux'
import * as qs from 'query-string'

import { getToken } from '../../auth'
import { resetState } from '../../actions/githubState'

class GithubAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount () {
    const queryParams = qs.parse(this.props.location.search)
    const gitHubState = getToken('githubState')
    if (! gitHubState) {
      alert('you did not have the githubstate in local storage.  Goodby')
      return ''
    }
    this.props.dispatch(resetState(gitHubState)).then(() => {
      // cannot use hasOwnProperty on query-string objects
      if (typeof queryParams.state === 'undefined' || queryParams.state !== gitHubState) {
        alert('we are redirecting you as state ' + queryParams.state + ' \n\n ' + gitHubState + ' \n\ndid not match')
      } else {
        alert('matching params so you would be authorised - we have the code and will send to the UI bff for final auth')
      }
    })
  }
  
  render () {
    return (
      <div>
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <p className="has-text-center"></p>Authorising
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

