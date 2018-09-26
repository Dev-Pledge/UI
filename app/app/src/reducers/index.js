import { combineReducers } from "redux";
import auth from './auth';
import feed from './feed';
import githubState from './githubState'

export default combineReducers({
  auth,
  feed,
  githubState
})
