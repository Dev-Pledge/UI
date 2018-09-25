import React, { Component } from 'react';
import Raven from 'raven-js'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaUser } from 'react-icons/fa'

import Navbar from '../../components/Navbar'
import { authUnlocked } from '../../actions/auth'
import { logRequestError } from '../../api/utils'
import { fetchProblem } from '../../api/problem'
import TopicList from '../../components/TopicsList'
import PledgeList from '../../components/PledgeList'
import CommentsList from '../../components/CommentsList'
import SolutionsList from '../../components/SolutionsList'
import { fetchTopics } from '../../api/topics'
import Loading from '../../components/Loading'

class Problem extends Component {

  constructor () {
    super()
    this.state = {
      problem: null,
      problem_id: '',
      showingTab: 'comments'
    }
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  componentDidMount () {
    this.props.dispatch(authUnlocked())
      .then(() => {
        const problem_id = this.props.match.params.problem_id
        if (! problem_id) {
          // redirect to home page
        }
        this.setState({ problem_id }, this.getProblem)
        // this.getTopics()
      })
  }

  getProblem () {
    fetchProblem(this.state.problem_id).then(res => {
      console.log(res)
      this.setState({
        problem: res.data
      })
    }).catch(err => {
      // redirect
      logRequestError(err)
    })
  }

  renderHTML (string) {
    // todo don't want HTML back.  Use draft js to set the markup
    return {__html: string};
  }

  renderProblem () {
    if (! this.state.problem) return ('')
    return (
      <div className="content-body">
        <p>
          <TopicList topics={this.state.problem.topics} />
        </p>
        <h1>{this.state.problem.title}</h1>
        <p className="sub">Description</p>
        <div className="margin-bottom-15" dangerouslySetInnerHTML={this.renderHTML(this.state.problem.description)} />
        <p className="sub">Specification</p>
        <div className="margin-bottom-15" dangerouslySetInnerHTML={this.renderHTML(this.state.problem.specification)} />
      </div>
    )
  }

  renderTitleBar () {
    if (! this.state.problem) return (<Loading />)
    return (
      <div className="row title-bar">
        <div className="col-md-8">
          <FaUser className="text-muted text-sm" /> &nbsp;{this.state.problem.user.username}
        </div>
        <div className="col-md-4">
          <em className="pull-right text-muted text-sm">
            @ {moment(this.state.problem.created).format('lll')}
            &nbsp; <span>Last modified: {moment(this.state.problem.modified).format('lll')}</span>
          </em>
        </div>
      </div>
    )
  }

  renderPledges () {
    return (
      <div>
        <div className="tab-header" onClick={() => this.setState({ showingTab: 'pledges'})}>
          Pledges <em className="text-muted">{this.state.problem.pledges_count}</em> worth {this.state.problem.pledges_value}
        </div>
        {this.state.showingTab === 'pledges' ?
          (<div className="tab-body">
            <PledgeList pledges={this.state.problem.latest_pledges} />
          </div>) : ''
        }
      </div>
    )
  }

  renderSolutions () {
    return (
      <div>
        <div className="tab-header" onClick={() => this.setState({ showingTab: 'solutions'})}>
          Solutions <em className="text-muted">{this.state.problem.solutions.length}</em>
        </div>
        {this.state.showingTab === 'solutions' ?
          (<div className="tab-body">
            <SolutionsList solutions={this.state.problem.solutions} />
          </div>) : ''
        }
      </div>
    )
  }

  renderComments () {
    return (
      <div>
        <div className="tab-header" onClick={() => this.setState({ showingTab: 'comments'})}>
          Comments <em className="text-muted">{this.state.problem.total_comments}</em>
        </div>
        {this.state.showingTab === 'comments' ?
          (<div className="tab-body">
            <CommentsList comments={this.state.problem.last_five_comments} />
          </div>) : ''
        }
      </div>
    )
  }

  renderTabs () {
    if (! this.state.problem) return (<Loading />)
    return (
      <div>
        <ul className="stacked-tab">
          <li className="stacked-tab-item">{this.renderPledges()}</li>
          <li className="stacked-tab-item">{this.renderSolutions()}</li>
          <li className="stacked-tab-item">{this.renderComments()}</li>
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            {this.renderTitleBar()}
            <div className="row">
              <div className="col-md-8">
                {this.renderProblem()}
              </div>
              <div className="col-md-4">
                {this.renderTabs()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Problem);