import React from 'react';
import { Link, NavLink } from "react-router-dom";
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
    if (auth.readyStatus === 'AUTH_AUTHORISED') return <NavLink activeClassName="active" to="/logout">Logout</NavLink>
    if (auth.readyStatus === 'AUTH_REQUESTING') return <span>Spinner</span>
    return (
      <span>
        <NavLink activeClassName="active" exact={true} to="/login">Login</NavLink>&nbsp;
        <NavLink activeClassName="active" exact={true} to="/signup">Signup</NavLink>
      </span>
    )
  }

  renderRouteLink (route, name) {
    return (
      <NavLink activeClassName="active" exact={true} to={route}>{name}</NavLink>
    )
  }

  render() {
    return (
      <div className="header-bar">
        <div className="top-bar">
          <div className="container-fluid">
            <div className="row d-flex align-items-center">
              <div className="col-sm">
                <ul>
                  <li>
                    <Link to="/">Explore</Link>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/create-problem">Suggest a Problem</NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-sm has-text-center">
                <h1 className="text-white">
                    <div className="logo-100"></div><span className="dev-color">Dev</span>Pledge</h1>
              </div>
              <div className="col-sm has-text-right">
                <ul>
                  <li>
                    {this.getUserName()}
                  </li>
                  <li>
                    {this.showLogInOut()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-bar">
          <div className="container-fluid">
            <div className="row d-flex align-items-center">
              <div className="col-sm">
                <ul>
                  <li>
                    <NavLink activeClassName="active" exact={true} to="/">Home</NavLink>
                  </li>
                  <li>
                    {this.renderRouteLink('/feed', 'Feed')}
                  </li>
                  <li>
                    {this.renderRouteLink('/preferences', 'Preferences')}
                  </li>
                </ul>
              </div>
              <div className="col-sm">
                <div className="has-text-right">
                  <em className="text-xs">Icon</em> Search <em className="text-xs">will expand</em>
                </div>
                { /*<input className="dp-input" placeholder="Search" />*/ }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store, routes) {
  return {
    auth: store.auth,
    location: routes
  }
}

export default connect(mapStateToProps)(Navbar);

