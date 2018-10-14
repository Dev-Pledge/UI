import React, { Component } from 'react';
import Raven from 'raven-js'
import { connect } from 'react-redux'
import moment from 'moment'
import { FaUser } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

import Navbar from '../../components/Navbar'
import { authUnlocked } from '../../actions/auth'
import { logRequestError } from '../../api/utils'
import { fetchUser} from '../../api/user'
import UserProfile from '../../components/UserProfile'
import PledgeList from '../../components/PledgeList'
import ProblemsList from '../../components/ProblemsList'
import SolutionsList from '../../components/SolutionsList'
import Loading from '../../components/Loading'

class User extends Component {

  constructor () {
    super()
    this.state = {
      tabs: [
        {name: 'profile', visible: true},
        {name:'statuses', visible: false},
        {name:'problems', visible: false},
        {name:'solutions', visible: false},
        {name:'pledges', visible: false}
      ],
      selected: 'profile',
      user: null,
      pledge_count: 0,
      pledges: [],
      solutions: [],
      statuses: []
    }

    this.username = ''
  }

  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  componentDidMount () {
    this.props.dispatch(authUnlocked())
      .then(() => {
        this.username = this.props.match.params.username
        if (! this.username) {
          this.props.history.push({
            pathname: "/",
            state: 'No username provided'
          })
        }
        this.getUser()
      })
  }

  getUser = () => {
    fetchUser(this.username).then(res => {
      console.log('user', res)
      this.setState({
        user: res.data.user,
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
    if (! this.state.user) return ('')
    const visibleTab = this.state.tabs.find(tab => tab.visible)
    if (! visibleTab) return 'we would return a default view'
    switch (visibleTab.name) {
      case 'profile':
        return (<UserProfile user={this.state.user} />)
        break;
      case 'pledges':
        return (<PledgeList pledges={this.state.pledges} />)
        break;
      case 'solutions':
        return (<SolutionsList solutions={this.state.solutions} />)
        break;
      case 'statuses':
        return (
          <div>
            Nothing yet
          </div>
        )
      case 'problems':
        return (<ProblemsList problems={this.state.problems} />)
        break;
      default:
        return ('could not find component')
    }
  }

  renderTabBar () {
    if (! this.state.user) return ''
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
                >{tab.name}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  renderTitleBar () {
    if (! this.state.user) return (<Loading />)
    return (
      <div className="row title-bar">
        <div className="col-md-8">
          <FaUser className="text-sm text-muted" /> &nbsp;{this.state.user.username}
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

export default connect(mapStateToProps)(User);
