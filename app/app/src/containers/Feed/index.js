import React from 'react';
import shouldFetchFeed from '../../actions/feed';
import { authUnlocked } from '../../actions/auth'
import { connect } from 'react-redux'
import FeedList from '../../components/FeedList';
import Promise from 'bluebird'

class Feed extends React.Component {

  componentDidMount () {
      Promise.all([
        // pre actions
        this.props.dispatch(authUnlocked())
      ]).then(() => {
        this.props.dispatch(shouldFetchFeed())
      })
  }

  feedList () {
    const { feed } = this.props
    if (feed.readyStatus === 'FEED_REQUESTING') {
      return <p>Loading...</p>
    }
    if (feed.readyStatus === 'FEED_SUCCESS') {
      return <FeedList list={feed.list} />
    }
    return <p>No feed to show - show something else.  Give error if applicable</p>
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2">
            panel 1
          </div>
          <div className="col">
            {this.feedList()}
          </div>
          <div className="col-sm-2">
            panel 2
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
    feed: store.feed
  }
}

export default connect(mapStateToProps)(Feed);

