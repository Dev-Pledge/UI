import React from 'react'
import { connect } from 'react-redux'
import * as qs from 'query-string'

import { getToken } from '../../auth'
import { initState } from '../../actions/githubState'

class GithubAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount () {
    const queryParams = qs.parse(this.props.location.search)
    const gitHubState = getToken('githubState')
    this.props.dispatch(initState()).then(() => {
      // cannot use hasOwnProperty on query-string objects
      if (typeof queryParams.state === 'undefined' || queryParams.state !== gitHubState) {
        alert('we are redirecting you as state ' + queryParams.state + ' \n\n ' + gitHubState + ' \n\ndid not match')
      } else {
        alert('matching params so you would be authorised')
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
                Authorising
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

