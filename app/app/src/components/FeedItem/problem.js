import React from 'react';
import { Link } from "react-router-dom";
import { TiPuzzle } from 'react-icons/ti'

import PledgeList from '../PledgeList'
import SolutionsList from '../SolutionsList'
import CommentsList from '../CommentsList'
import AddComment from '../AddComment'
import TopicList from '../TopicsList'
import { limitLength } from '../../utils'
import { fetchComments } from '../../api/comment'

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
      ],
      showMoreComments: false,
      comments: []
    }
  }

  componentDidMount () {
    this.setInitialState()
  }

  setInitialState () {
    this.setState({
      problem_id: this.props.data.problem_id,
      data: this.props.data,
      comments: this.props.data.last_five_comments
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    if (nextProps.data.problem_id !== this.props.data.problem_id) {
      // set initial state
      this.setInitialState()
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

  getMoreComments = () => {
    fetchComments(this.props.data.problem_id).then(res => {
      this.setState({
        comments: res.data.comments,
        showMoreComments: true
      })
    }).catch(err => {
      console.log(err)
    })
  }

  renderComments = () => {
    if (! this.state.comments.length) return ''
    if (! this.state.showMoreComments) return (
      <div>
        <div onClick={this.getMoreComments} className="text-sm text-center">Load more</div>
        <CommentsList comments={this.state.comments} />
      </div>
    )
    return (
      <div>
        <CommentsList comments={this.state.comments} />
      </div>
    )
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
        return (
          <div>
            <AddComment parentId={this.props.data.problem_id} onSuccess={this.getMoreComments} />
            {this.renderComments()}
          </div>
        )
      break;
      default:
        return ('could not find component')
    }
  }

  render () {
    // todo assign to state
    if (! this.state.data) return ''
    return (
      <li>
        <div className="inner-header is-light">
          <div className="row">
            <div className="col col-8">
              <span className="title"><TiPuzzle className="text-muted text-xl" /> {limitLength(this.state.data.title)}</span>
            </div>
            <div className="col col-4 has-text-right dp-info">
              Pledged: ${this.state.data.pledges_value}
            </div>
          </div>
        </div>
        <div className="inner">
          <div className="row">
            <div className="col">
              <p>{limitLength(this.state.data.description)}</p>
              <div className="margin-bottom-15"><TopicList topics={this.state.data.topics} /></div>
              <Link to={`problem/${this.state.data.problem_id}`} >{this.state.data.problem_id}</Link>
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
              >pledges ({this.state.data.pledges_count})</li>
              <li
                className={this.state.selected === 'solution' ? 'is-active' : ''}
                onClick={() => this.showTab('solution')}
              >solutions ({this.state.data.solutions.length})</li>
              <li
                className={this.state.selected === 'comment' ? 'is-active' : ''}
                onClick={() => this.showTab('comment')}
              >comments ({this.state.data.total_comments})</li>
            </ul>

        </div>
      </li>
    )
  }

}

export default FeedItemProblem;

