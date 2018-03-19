/* @flow */

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import * as actionJwt from '../../actions/jwt';

import type { Auth, ReduxState, Dispatch } from '../../types';

import styles from './styles.scss';

type Props = {
  auth: Auth,
  actionAttemptLogin: () => void
};

export class Login extends PureComponent<Props> {
  attemptLogin = e => {
    e.preventDefault();
    this.props.actionAttemptLogin();
  };

  render() {
    return (
      <div className={styles.Login}>
        {this.props.auth.readyStatus}
        <h4>Login</h4>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button onClick={e => this.attemptLogin(e)}>Login</button>
        <p>
          You can just hit login button for now and you will become Big Bill!
        </p>
      </div>
    );
  }
}

const connector = connect(
  ({ auth }: ReduxState) => ({ auth }),
  (dispatch: Dispatch) => ({
    actionAttemptLogin: () => dispatch(actionJwt.attemptLogin())
  })
);

// Enable hot reloading for async componet
export default compose(hot(module), withRouter, connector)(Login);
