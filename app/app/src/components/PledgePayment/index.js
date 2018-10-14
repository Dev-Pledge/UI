import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { CardElement, injectStripe, PostalCodeElement } from 'react-stripe-elements';
import { postPledge } from '../../api/pledge'
import { postPayment } from '../../api/stripe'
import { logRequestError } from '../../api/utils'

class Pledge extends Component {

  constructor (props) {
    super(props);
    this.state = {
      value: 5
    }
  }

  makePledge (token) {
    postPledge(this.props.problem_id, {
      comment: "A Solution for this problem will be greatly appreciated!",
      value: this.state.value,
      currency: "USD"
    }).then(res => {
      console.log('res pledge', res)
      const pledgeId = res.data.pledge_id
      console.log('here is the token', token)
      postPayment(pledgeId, token).then(res => {
        console.log(res)
        this.props.history.push({
          pathname: `/problem/${this.props.problem_id}`,
          state: 'SUCCESSSSSSSSS!!!!!!'
        })
      })
    }).catch(err => {
      logRequestError(err)
    })
  }


  submit = e => {
    e.preventDefault()
    // User clicked submit
    this.props.stripe.createToken({name: "Name"}).then(res => {
      console.log('here is the res face', res)
      this.makePledge(res.token.id)
      console.log(res)
    });
  }

  handleValueChange (val) {
    this.setState({
      value: val
    })
  }


  render () {
    return (
      <form className="dp-form">
        <label>How much would you like to pledge</label>
        <input className="dp-input" value={this.state.value} onChange={e => this.handleValueChange(e.target.value)} />
        <br/>
        <CardElement hidePostalCode={true} />
        <br/>
        <button className="dp-button is-primary is-block" onClick={this.submit}>Send</button>
      </form>
    );
  }
}

export default withRouter(injectStripe(Pledge));