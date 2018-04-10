import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

class Navbar extends React.Component {

  getUserName() {
    const { auth } = this.props
    if (auth.readyStatus === 'AUTH_AUTHORISED') {
      return 'Hi there ' + auth.username
    }
    return 'Hi there'
  }

  showLogInOut() {
    const { auth } = this.props
    if (auth.readyStatus === 'AUTH_AUTHORISED') {
      return <Link to="/logout">Logout</Link>
    }
    if (auth.readyStatus === 'AUTH_REQUESTING') {
      return <span>Spinner</span>
    }
    return <Link to="/login">Login</Link>
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="container-fluid">
          <div className="row d-flex align-items-center">
            <div className="col-sm">
              <h2>DevPledge</h2>
            </div>
            <div className="col-sm">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/feed">Feed</Link>
                </li>
              </ul>
            </div>
            <div className="col-sm has-text-right">
              {this.getUserName()}
              {this.showLogInOut()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Navbar);

