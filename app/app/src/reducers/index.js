import { combineReducers } from "redux";
import auth from './auth';
import feed from './feed';

export default combineReducers({
  auth,
  feed
})
