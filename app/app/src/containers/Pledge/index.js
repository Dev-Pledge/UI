import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {connect} from 'react-redux'

import PledgePayment from '../../components/PledgePayment';
import Navbar from '../../components/Navbar'
import { fetchPublicApiKey } from '../../api/stripe'
import { logRequestError } from '../../api/utils'
import {authUnlocked} from '../../actions/auth'

class Pledge extends Component {

  constructor(props) {
    super(props);
    this.state = { apiKey: null }
    this.authOnly = true
  }

  componentDidMount () {
    this.props.dispatch(authUnlocked(this.authOnly))
      .then(() => {
        this.getPublicKey()
      }).catch(err => {
        this.props.history.push({
          pathname: "/login",
          state: 'You need to be logged in to do that'
        })
      })
  }

  getPublicKey () {
    fetchPublicApiKey().then(res => {
      console.log(res)
      this.setState({ apiKey: res.data.api_key})
    }).catch(err => {
      logRequestError(err)
    })
  }

  render() {
    if (! this.state.apiKey) return ''
    return (
      <StripeProvider apiKey={this.state.apiKey}>
        <div>
          <Navbar />
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4 offset-md-4">
                  <div className="box is-strong has-shadow">
                    <Elements>
                      <PledgePayment />
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