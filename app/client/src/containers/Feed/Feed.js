/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import CreateProblem from '../../components/CreateProblem';
import * as actionFeed from '../../actions/feed';
import * as actionJwt from '../../actions/jwt';
import type { Feed as FeedType, Dispatch, ReduxState } from '../../types';
import { FeedList } from '../../components';

import styles from './styles.scss';

type Props = {
  fetchJwtIfNeeded: () => void,
  feed: FeedType,
  fetchFeed: () => void
};

// Export this for unit testing more easily
export class Feed extends PureComponent<Props> {
  componentDidMount() {
    console.log('component did mount FEED');
    this.props.fetchJwtIfNeeded();
    this.props.fetchFeed();
    // fetch feed
  }

  componentWillUpdate() {
    console.log('component will update FEED');
    this.props.fetchJwtIfNeeded();
  }

  renderFeed = () => {
    const { feed } = this.props;

    if (!feed.readyStatus || feed.readyStatus === 'FEED_REQUESTING') {
      return [];
    } else if (feed.readyStatus === 'FEED_FAILURE') {
      return [];
    }

    return <FeedList list={feed.list} />;
  };

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Feed" />
        <div className={styles['container-fluid']}>
          <div className={styles.row}>
            <div className={styles['col-3']}>
              <span>Here is panel</span>
            </div>
            <div className={styles['col-9']}>
              <CreateProblem />
              {this.renderFeed()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector = connect(
  ({ feed }: ReduxState) => ({ feed }),
  (dispatch: Dispatch) => ({
    fetchJwtIfNeeded: () => dispatch(actionJwt.fetchJwtIfNeeded()),
    fetchFeed: () => dispatch(actionFeed.fetchFeed())
  })
);

export default compose(hot(module), withRouter, connector)(Feed);
