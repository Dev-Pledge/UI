import React, { Component } from 'react';
import Raven from 'raven-js'

class Home extends Component {
  /* example of catching raven error on component error */
  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Hello homepage</h1>
      </div>
    );
  }
}

export default Home;
