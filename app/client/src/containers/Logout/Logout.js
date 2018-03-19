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
  actionLogout: () => void
};

export class Logout extends PureComponent<Props> {
  componentDidMount() {
    this.props.actionLogout();
  }

  render() {
    return (
      <div className={styles.Logout}>
        <h4>You have been logged out</h4>
        <p>
          No point for separate page for this, but hey. Makes sense for now.
        </p>
        {this.props.auth.readyStatus}
      </div>
    );
  }
}

const connector = connect(
  ({ auth }: ReduxState) => ({ auth }),
  (dispatch: Dispatch) => ({
    actionLogout: () => dispatch(actionJwt.logout())
  })
);

// Enable hot reloading for async componet
export default compose(hot(module), withRouter, connector)(Logout);
