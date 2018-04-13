import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import configureStore from './store'
import { Provider } from 'react-redux'
// import { unregister } from './registerServiceWorker';
console.log('here is the environment', process.env.NODE_ENV)
const store = configureStore()

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
if (process.env.NODE_ENV !== 'production') {
  // stuck in production at the mo as we are building react into docker.  Big todo
  // registerServiceWorker();
}
