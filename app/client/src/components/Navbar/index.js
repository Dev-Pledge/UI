/* @flow */

import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import type { Auth, ReduxState } from '../../types';

import routes from '../../routes';
import styles from './styles.scss';

type Props = {
  auth: Auth
};

class Navbar extends PureComponent<Props> {
  componentDidMount() {
    console.log('here are the props', this.props.auth);
  }

  getMenuItems = () => routes[0].routes.filter(route => route.isMenu);

  getSalultation = () => {
    if (this.props.auth.readyStatus === 'AUTH_SUCCESS') {
      return <span>Hi, {this.props.auth.username}</span>;
    }
    return '';
  };

  getLoginPrompt = () => {
    if (this.props.auth.readyStatus === 'AUTH_SUCCESS') {
      return (
        <li>
          <Link to="/logout">logout</Link>
        </li>
      );
    }
    return (
      <li>
        <Link to="/login">login</Link>
      </li>
    );
  };

  render() {
    return (
      <div className={styles.Navbar}>
        <ul>
          {this.getMenuItems().map(route => (
            <li key={route.name}>
              <Link to={`${route.path}`}>{route.name}</Link>
            </li>
          ))}
          {this.getLoginPrompt()}
        </ul>
        <div className={styles.welcome}>{this.getSalultation()}</div>
      </div>
    );
  }
}

const connector = connect(({ auth }: ReduxState) => ({ auth }));

// Enable hot reloading for async componet
export default compose(hot(module), withRouter, connector)(Navbar);
