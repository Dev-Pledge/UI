import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers/index";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import Raven from 'raven-js'
import createRavenMiddleware from "raven-for-redux";
import throttle from 'lodash/throttle';
import { authUnlocked } from  './../actions/auth'

const middleWare = applyMiddleware(createRavenMiddleware(Raven, {
  // Optionally pass some options here.
}), promise(), thunk, logger);

const configureStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(middleWare)
  )
  throttle(() => {
    store.dispatch(authUnlocked())
  }, 1000)
  return store
}
export default configureStore