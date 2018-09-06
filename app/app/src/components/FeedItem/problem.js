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
          <span className="title">Problem: {this.props.data.title}</span>
        </div>
        <div className="inner">
          <div className="row">
            <div className="col col-8">
              <p>{this.props.data.description}</p>
            </div>
            <div className="col col-4">
              <PledgeList pledges={this.props.data.latest_pledges} />
            </div>

          </div>

          <div></div>
          <div><SolutionsList solutions={this.props.data.solutions} /></div>
          <div><TopicList topics={this.props.data.topics} /></div>
        </div>
      </li>
    )
  }

}

export default FeedItemProblem;

