/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

// import * as actionUsers from '../../actions/users';
import * as actionJwt from '../../actions/jwt';
// import type { Home as HomeType, Dispatch, ReduxState } from '../../types';  // todo a different feed fetch poss
import type { Dispatch, ReduxState } from '../../types';
import styles from './styles.scss';

type Props = {
  // home: HomeType,
  fetchJwtIfNeeded: () => void
};

// Export this for unit testing more easily
export class Home extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchJwtIfNeeded();
  }

  componentWillUpdate() {
    this.props.fetchJwtIfNeeded();
  }

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              <h1>This is devPledge Home</h1>
              <p>
                Generic landing page, what devpledge is about, top pledges etc.
                Minimal customisation for logged in user
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector = connect(
  ({ home }: ReduxState) => ({ home }),
  (dispatch: Dispatch) => ({
    fetchJwtIfNeeded: () => dispatch(actionJwt.fetchJwtIfNeeded())
  })
);

// Enable hot reloading for async componet
export default compose(hot(module), withRouter, connector)(Home);
