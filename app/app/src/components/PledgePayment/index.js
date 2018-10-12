import React, {Component} from 'react';
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
    postPledge('prb-5af2740a-17ce-4e20-b5f0-163e10f0db6a', {
      comment: "A Solution for this problem will be greatly appreciated!",
      value: 2.50,
      currency: "USD"
    }).then(res => {
      console.log('res pledge', res)
      const pledgeId = res.data.pledge_id
      console.log('here is the token', token)
      postPayment(pledgeId, token).then(res => {
        console.log(res)
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
        <p>Make that pledge?</p>
        <p>My emotion are ... ¯\_(ツ)_/¯</p>
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

export default injectStripe(Pledge);