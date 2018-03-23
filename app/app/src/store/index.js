import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers/index";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
const middleWare = applyMiddleware(promise(), thunk, logger);
export default createStore(reducers, composeWithDevTools(middleWare))