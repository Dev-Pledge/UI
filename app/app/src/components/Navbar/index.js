import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

class Navbar extends React.Component {

  getUserName() {
    console.log(this.props.auth)
    const { auth } = this.props
    if (auth.readyStatus === 'AUTH_AUTHORISED') {
      return 'Hi there ' + auth.username
    }
    return 'Hi there'
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

