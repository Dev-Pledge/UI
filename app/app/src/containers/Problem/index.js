import React, { Component } from 'react';
import Raven from 'raven-js'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaUser } from 'react-icons/fa'

import Navbar from '../../components/Navbar'
import { authUnlocked } from '../../actions/auth'
import { logRequestError } from '../../api/utils'
import { fetchProblem } from '../../api/problem'
import RenderProblem from '../../components/Problem'
import PledgeList from '../../components/PledgeList'
import CommentsList from '../../components/CommentsList'
import SolutionsList from '../../components/SolutionsList'
import AddSolution from '../../components/AddSolution'
import AddComment from '../../components/AddComment'
import Loading from '../../components/Loading'

class Problem extends Component {

  constructor () {
    super()
    this.state = {
      tabs: [
        {name: 'problem', visible: true},
        {name: 'solutions', visible: false},
        {name: 'pledges', visible: false},
        {name: 'comments', visible: false}
      ],
      selected: 'problem',
      problem: null,
      problem_id: '',
      showingTab: 'comments',
      showAddSolution: false,
      currencySymbol: '$'
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
      })
  }

  getProblem = () => {
    fetchProblem(this.state.problem_id).then(res => {
      console.log('problem', res)
      this.setState({ problem: res.data })
    }).catch(err => {
      // redirect
      logRequestError(err)
    })
  }

  solutionAdded = () => {
    this.getProblem()
    this.setState({
      showAddSolution: false
    })
  }

  renderAddSolution () {
    if (this.state.showAddSolution) return (
      <AddSolution problem_id={this.state.problem_id} onSuccess={this.solutionAdded} />
    )
  }

  renderTitleBar () {
    if (! this.state.problem) return (<Loading />)
    return (
      <div className="row title-bar">
        <div className="col-md-8">
          <FaUser className="text-sm text-muted" /> &nbsp;{this.state.problem.user.username}
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
    if (! this.state.problem) return ('')
    const visibleTab = this.state.tabs.find(tab => tab.visible)
    if (! visibleTab) return 'we would return a default view'
    switch (visibleTab.name) {
      case 'problem':
        return (
          <RenderProblem problem={this.state.problem} />
        )
        break;
      case 'pledges':
        return (
          <div>
            <PledgeList problem_id={this.state.problem_id} pledges={this.state.problem.latest_pledges} />
          </div>
        )
        break;
      case 'solutions':
        return (
          <div>
            <SolutionsList solutions={this.state.problem.solutions} />
            <button className="dp-button is-secondary" onClick={() => this.setState({showAddSolution: ! this.state.showAddSolution})} >
              {this.state.showAddSolution ? 'don\'t add solution' : '+ solution'}
            </button>
            {this.renderAddSolution()}
          </div>
        )
        break;
      case 'comments':
        return (
          <div>
            <AddComment parentId={this.state.problem_id} onSuccess={this.getProblem} />
            <CommentsList comments={this.state.problem.last_five_comments} />
          </div>
        )
        break
      default:
        return ('could not find component')
    }
  }

  renderTabExtraInfo (name) {
    switch (name) {
      case 'pledges':
        return (
          <span>
            <em className="text-muted">
              ({this.state.problem.pledges_count} worth {this.state.currencySymbol}{this.state.problem.pledges_value})
            </em>
          </span>
        )
        break;
      case 'solutions':
        return (
          <span>
            <em className="text-muted">({this.state.problem.solutions.length})</em>
          </span>
        )
        break;
      case 'comments':
        return (
          <span>
            <em className="text-muted">({this.state.problem.total_comments})</em>
          </span>
        )
        break
      default:
        return ''
    }
  }

  renderTabBar () {
    if (! this.state.problem) return ''
    return (
      <div className="row tab-bar">
        <ul className="is-tabbed-list is-small has-text-right">
          {
            this.state.tabs.map(tab => {
              return (
                <li
                  key={tab.name}
                  className={tab.visible ? 'is-active' : ''}
                  onClick={() => this.showTab(tab.name)}
                >{tab.name} {this.renderTabExtraInfo(tab.name)}</li>
              )
            })
          }
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
            {this.renderTabBar()}
            <div className="row">
              <div className="col">
                {this.renderTab()}
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
