import React, { Component } from 'react';
import Raven from 'raven-js'

import Navbar from '../../components/Navbar'
import Flash from '../../components/Flash'

class Home extends Component {
  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Flash errorMessage={this.props.location.state} />
        <div className="content-wrapper">
          <div className="container-fluid">
            <h1>Hello homepage</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
