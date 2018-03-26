import React from 'react';
import shouldFetchFeed from '../../actions/feed';
import { authUnlocked } from '../../actions/auth'
import { connect } from 'react-redux'
import FeedList from '../../components/FeedList';
import CreateProblem from '../../components/Problem/createProblem'
import Promise from 'bluebird'
import { VelocityTransitionGroup } from 'velocity-react';

class Feed extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showCreate: false,
      createButtonText: 'Create Problem'
    }
  }

  componentDidMount () {
      Promise.all([
        // pre actions
        this.props.dispatch(authUnlocked())
      ]).then(() => {
        this.props.dispatch(shouldFetchFeed())
      })
  }

  showCreate = () => {
    this.setState({
      showCreate: !this.state.showCreate,
      createButtonText: this.state.showCreate ? 'Create Problem' : 'Not right now',
    });
    this.showHideCreate()
  }

  showHideCreate = () => {
    if (this.state.showCreate) {
      return <div className="box is-light">
        <CreateProblem />
      </div>
    }
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
          <div className="col col-sm-2">
            panel 1
          </div>
          <div className="col-sm">
            <div>
              <button className="dp-button is-primary is-inline" onClick={this.showCreate}>{this.state.createButtonText}</button>
              <button className="dp-button is-secondary is-inline">What are you working on now?</button>
              <VelocityTransitionGroup
                enter={{ animation: 'slideDown' }}
                leave={{ animation: 'slideUp' }}
              >
              {this.showHideCreate()}
              </VelocityTransitionGroup>
            </div>
            {this.feedList()}
          </div>
          <div className="col col-sm-2">
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

