import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import appConfig from './appConfig'
// import registerServiceWorker from './registerServiceWorker';
import Raven from 'raven-js';
import configureStore from './store'
import { Provider } from 'react-redux'
// import { unregister } from './registerServiceWorker';

console.log('here is the environment', process.env.NODE_ENV)
console.log('here is the environment', process)
Raven.config(appConfig.ravenDSN).install()
const store = configureStore()

console.log('here is the process', process)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
if (process.env.NODE_ENV !== 'production') {
  // stuck in production at the mo as we are building react into docker.  Big todo
  // registerServiceWorker();
}
