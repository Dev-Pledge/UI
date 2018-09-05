import React from 'react';

import PledgeList from '../PledgeList'
import SolutionsList from '../SolutionsList'
import TopicList from '../TopicsList'

class FeedItemProblem extends React.Component {

  constructor () {
    super()
    this.state = {
      //...
    }
  }

  render () {
    // todo assign to state
    if (! this.props.data) return ''
    return (
      <li>
        <div className="inner-header is-light">
          <span className="title">Problem type</span>
        </div>
        <div className="inner">
          <p>{this.props.data.title} - {this.props.data.created}</p>
          <p>{this.props.data.description}</p>
          <div><PledgeList pledges={this.props.data.latest_pledges} /></div>
          <div><SolutionsList solutions={this.props.data.solutions} /></div>
          <div><TopicList topics={this.props.data.topics} /></div>
        </div>
      </li>
    )
  }

}

export default FeedItemProblem;

