import { combineReducers } from 'redux';
import collection from './collection';
import currentUser from './currentUser';
import errors from './errors';

export default combineReducers({
  collection,
  currentUser,
  errors,
});
