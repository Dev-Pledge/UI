import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {connect} from 'react-redux'

import PledgePayment from '../../components/PledgePayment';
import Navbar from '../../components/Navbar'
import Loading from '../../components/Loading'
import { fetchPublicApiKey } from '../../api/stripe'
import { fetchProblem } from '../../api/problem'
import { logRequestError } from '../../api/utils'
import {authUnlocked} from '../../actions/auth'

class Pledge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiKey: null,
      problem: null
    }
    this.authOnly = true
    this.problem_id = ''
  }

  componentDidMount () {
    this.props.dispatch(authUnlocked(this.authOnly))
      .then(() => {
        this.problem_id = this.props.match.params.problem_id
        if (! this.problem_id) {
          this.props.history.push({
            pathname: "/",
            state: 'No problem provided'
          })
        }
        this.getPublicKey()
        this.getProblem()
      }).catch(err => {
        logRequestError(err)
        this.props.history.push({
          pathname: "/login",
          state: 'You need to be logged in to do that'
        })
      })
  }

  getProblem () {
    fetchProblem(this.problem_id)
      .then(res => {
        console.log('here is the res', res, res.data)
        this.setState({
          problem: res.data
        })
      })
      .catch(err => {
        logRequestError(err)
        this.props.history.push({
          pathname: "/",
          state: 'We could not find that problem'
        })
      })
  }

  getPublicKey () {
    fetchPublicApiKey().then(res => {
      this.setState({ apiKey: res.data.api_key})
    }).catch(err => {
      logRequestError(err)
    })
  }

  render() {
    if (! this.state.apiKey || ! this.state.problem) return (<Loading />)
    return (
      <StripeProvider apiKey={this.state.apiKey}>
        <div>
          <Navbar />
          <div className="content-wrapper">
            <div className="container-fluid">`
              <div className="row">
                <div className="col-md-4 offset-md-4">
                  <div className="box is-strong has-shadow">
                    <p className="text-lg has-text-center text-secondary">Make a pledge for { this.state.problem.title }</p>
                    <Elements>
                      <PledgePayment problem_id={this.problem_id} />
                    </Elements>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StripeProvider>
    )
  }
}

function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Pledge);