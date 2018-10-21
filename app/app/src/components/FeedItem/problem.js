import React from 'react';
import { Link } from "react-router-dom";
import { TiPuzzleOutline } from 'react-icons/ti'
import { TiUserOutline } from 'react-icons/ti'
import moment from 'moment'

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
      selected: 'problem',
      tabs: [
        {
          name: 'problem',
          visible: true
        },
        {
          name: 'pledge',
          visible: false
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
        {/*<div onClick={this.getMoreComments} className="text-sm text-center">Load more</div>*/}
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
    if (! visibleTab) return 'we would return a default view'
    switch (visibleTab.name) {
      case 'pledge':
        return (<PledgeList problem_id={this.props.data.problem_id} pledges={this.props.data.latest_pledges} />)
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
      case 'problem':
        return (
          <div className="problem-content">
            <p>
              <TiPuzzleOutline className="text-muted text-xl inline-icon " />
              &nbsp;{this.state.data.description}</p>
            <p className="text-xs no-bottom">
              <TiUserOutline className="text-muted text-xl inline-icon " />
              &nbsp;<span className="text-quaternary">
                <Link to={`user/${this.state.data.user.username}`}>
                  {this.state.data.user.username}
                </Link>
              </span>
              &nbsp;<span className="text-muted">@</span>
              &nbsp;<span className="">{moment.utc(this.state.data.created).local().format('lll')}</span>
            </p>
            <p className="text-xs no-bottom text-faded">For debug: {this.state.data.problem_id}</p>
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
      <li className="feed-item">
        <div className="inner-header is-light">
          <div className="row">
            <div className="col col-8">
                <span>
                  <TopicList topics={this.state.data.topics} extraTagClases="is-small is-secondary with-fill" />
                </span>
                <span className="title">
                  &nbsp;{limitLength(this.state.data.title)}
                </span>
            </div>
            <div className="col col-4 has-text-right dp-info">
              Pledges  ${this.state.data.pledges_value}
            </div>
          </div>
        </div>
        <div className="inner">
          <div className="row">
            <div className="col">
              <div className="scrollable tabbed-content">
                {this.renderTab()}
              </div>
            </div>
          </div>
        </div>
        <div className="inner-footer">{/* offset this to component */}
          <div className="row">
            <div className="col">
              <ul className="is-tabbed-list is-small has-text-right">
                <li>
                  <Link to={`problem/${this.state.data.problem_id}`}>
                    View More
                  </Link>
                </li>
                <li
                  className={this.state.selected === 'problem' ? 'is-active' : ''}
                  onClick={() => this.showTab('problem')}
                >Problem</li>
                <li
                  className={this.state.selected === 'pledge' ? 'is-active' : ''}
                  onClick={() => this.showTab('pledge')}
                >Pledges ({this.state.data.pledges_count})</li>
                <li
                  className={this.state.selected === 'solution' ? 'is-active' : ''}
                  onClick={() => this.showTab('solution')}
                >Solutions ({this.state.data.solutions.length})</li>
                <li
                  className={this.state.selected === 'comment' ? 'is-active' : ''}
                  onClick={() => this.showTab('comment')}
                >Comments ({this.state.data.total_comments})</li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    )
  }

}

export default FeedItemProblem;

