import React, {Component} from 'react';
import {CardElement, injectStripe, PostalCodeElement} from 'react-stripe-elements';

class Pledge extends Component {

  constructor (props) {
    super(props);
    this.state = {
      value: 5
    }
  }

  submit = ev => {
    // User clicked submit
    console.log('something stripy', ev, 'would be creating tokens here etc and sending to the server for process')
    alert('I\'m ooooout')
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
        <CardElement />
        <br/>
        <button className="dp-button is-primary is-block" onClick={this.submit}>Send</button>
      </form>
    );
  }
}

export default injectStripe(Pledge);