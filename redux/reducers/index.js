import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';

export default combineReducers({
  currentUser,
  errors,
});
