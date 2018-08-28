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
    if (auth.readyStatus === 'AUTH_AUTHORISED') return <Link to="/logout">Logout</Link>
    if (auth.readyStatus === 'AUTH_REQUESTING') return <span>Spinner</span>
    return (
      <span>
        <Link to="/login">Login</Link>&nbsp;
        <NavLink activeClassName="active" exact to="/signup">Signup</NavLink>
      </span>
    )
  }

  renderRouteLink (route, name) {
    /* use this to add class to active */
    console.log('foo', this.props)
    return (
      <Link className="" to={route}>{name}</Link>
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
                    <Link to="/feed">Present a problem</Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm has-text-center">
                <h1 className="text-white">Devpledge</h1>
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
                    <Link className="active" to="/">Home</Link>
                  </li>
                  <li>
                    {this.renderRouteLink('/feed', 'Feed')}
                  </li>
                  <li>
                    {this.renderRouteLink('/', 'Foo')}
                  </li>
                  <li>
                    {this.renderRouteLink('/feed', 'Bar')}
                  </li>
                  <li>
                    {this.renderRouteLink('/feed', 'Baz')}
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

