import React from 'react';
import { logout } from '../../actions/auth'
import { connect } from 'react-redux'

import Navbar from '../../components/Navbar'

class Logout extends React.Component {

  componentDidMount () {
    this.props.dispatch(logout())
      .then(() => {
        setTimeout(() => {
          return this.props.history.push('/')
        }, 2000)
      })
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <p>Just logging you out and pretending it takes longer than it does</p>
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

export default connect(mapStateToProps)(Logout);

