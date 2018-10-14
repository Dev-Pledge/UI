import React, { Component } from 'react';
import Raven from 'raven-js'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaUser } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

import Navbar from '../../components/Navbar'
import { authUnlocked } from '../../actions/auth'
import { logRequestError } from '../../api/utils'
import { fetchSolution} from '../../api/solution'
import UserProfile from '../../components/UserProfile'
import PledgeList from '../../components/PledgeList'
import ProblemsList from '../../components/ProblemsList'
import SolutionsList from '../../components/SolutionsList'
import Loading from '../../components/Loading'

class Solution extends Component {

  constructor () {
    super()
    this.state = {
      tabs: [
        {name: 'solution', visible: true},
        {name:'problem', visible: false},
        {name:'comments', visible: false}
      ],
      selected: 'solution',
      solution: null,
      pledge_count: 0,
      pledges: [],
      solutions: [],
      statuses: []
    }

    this.solution_id = ''
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  componentDidMount () {
    this.props.dispatch(authUnlocked())
      .then(() => {
        this.solution_id = this.props.match.params.solution_id
        if (! this.solution_id) {
          this.props.history.push({
            pathname: "/",
            state: 'No solution provided'
          })
        }
        this.getSolution()
      })
  }

  getSolution = () => {
    this.setState({
      solution: 1
    })
    /*
    fetchSolution(this.solution_id).then(res => {
      console.log('user', res)
      this.setState({
        solution: 1,
        pledge_count: res.data.pledge_count,
        solutions: res.data.solutions,
        problems: res.data.problems,
        statuses: res.data.statuses
      })
    }).catch(err => {
      logRequestError(err)
      this.props.history.push({
        pathname: "/",
        state: 'We could not find that user'
      })
    })
    */
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
    if (! this.state.solution) return ('')
    const visibleTab = this.state.tabs.find(tab => tab.visible)
    if (! visibleTab) return 'we would return a default view'
    switch (visibleTab.name) {
      case 'solution':
        return (<div>Coming soon.  No endpoint available</div>)
        break;
      case 'comments':
        return (<div>Coming soon.  No endpoint available</div>)
        break;
      case 'problem':
        return (<div>Coming soon.  No endpoint available</div>)
        break;
      default:
        return ('could not find component')
    }
  }

  renderTabBar () {
    if (! this.state.solution) return ''
    return (
      <div className="row tab-bar">
        <ul className="is-tabbed-list is-small has-text-right">
          {
            this.state.tabs.map(tab => {
              return (
                <li key={tab.name}
                  className={tab.visible ? 'is-active' : ''}
                  onClick={() => this.showTab(tab.name)}
                >{tab.name}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  renderTitleBar () {
    if (! this.state.solution) return (<Loading />)
    return (
      <div className="row title-bar">
        <div className="col-md-8">
          Here would be the solution name
        </div>
        <div className="col-md-4">
          <em className="pull-right text-muted text-sm">
            coming soon
          </em>
        </div>
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

export default connect(mapStateToProps)(Solution);
