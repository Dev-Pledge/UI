import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers/index";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
// import throttle from 'lodash/throttle';
import { authUnlocked } from  './../actions/auth'

const middleWare = applyMiddleware(promise(), thunk, logger);

const configureStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(middleWare)
  )
  console.log('auth', 'moo')
  store.dispatch(authUnlocked())
    /*
  throttle(() => {
    authUnlocked()
  }), 1000)
  */
  return store
}
export default configureStore