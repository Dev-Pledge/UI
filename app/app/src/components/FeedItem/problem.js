import React from 'react';

import PledgeList from '../PledgeList'
import SolutionsList from '../SolutionsList'
import TopicList from '../TopicsList'

class FeedItemProblem extends React.Component {

  constructor () {
    super()
    this.state = {
      //...
      selected: 'pledge',
      tabs: [
        {
          name: 'pledge',
          visible: true
        },
        {
          name: 'solution',
          visible: false
        },
        {
          name: 'comment',
          visible: false
        }
      ]
    }
  }

  showTab = (tabName) => {
    this.setState({
      tabs: this.state.tabs.map(tab => {
        tab.visible = tab.name === tabName
        return tab
      }),
      selected: tabName
    })
  }

  renderTab () {
    const visibleTab = this.state.tabs.find(tab => tab.visible)
    if (! visibleTab) return 'we would retrun a default view'
    switch (visibleTab.name) {
      case 'pledge':
        return (<PledgeList pledges={this.props.data.latest_pledges} />)
      break;
      case 'solution':
        return (<SolutionsList solutions={this.props.data.solutions} />)
      break;
      case 'comment':
        return ('have not done comment yet')
      break;
      default:
        return ('could not find component')
    }
  }

  render () {
    // todo assign to state
    if (! this.props.data) return ''
    return (
      <li>
        <div className="inner-header is-light">
          <div className="row">
            <div className="col col-8">
              <span className="title">Problem: {this.props.data.title}</span>
            </div>
            <div className="col col-4 has-text-right">
              Worth: £{this.props.data.pledges_value}
            </div>
          </div>
        </div>
        <div className="inner">
          <div className="row">
            <div className="col">
              <p>{this.props.data.description} ...will limit length</p>
              <p>{this.props.data.specification} ...will limit length</p>
              <div className="margin-bottom-15"><TopicList topics={this.props.data.topics} /></div>
            </div>
            <div className="col">
              {this.renderTab()}
            </div>
          </div>
        </div>
        <div className="tabFooter">{/* offset this to component */}

            <ul className="is-tabbed-list is-small has-text-right">
              <li
                className={this.state.selected === 'pledge' ? 'is-active' : ''}
                onClick={() => this.showTab('pledge')}
              >pledges ({this.props.data.pledges_count})</li>
              <li
                className={this.state.selected === 'solution' ? 'is-active' : ''}
                onClick={() => this.showTab('solution')}
              >solutions ({this.props.data.solutions.length})</li>
              <li
                className={this.state.selected === 'comment' ? 'is-active' : ''}
                onClick={() => this.showTab('comment')}
              >comments ({this.props.data.total_comments})</li>
            </ul>

        </div>
      </li>
    )
  }

}

export default FeedItemProblem;

