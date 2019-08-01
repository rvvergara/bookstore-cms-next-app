import { combineReducers } from 'redux';
import collection from './collection';
import currentUser from './currentUser';
import errors from './errors';
import searchResults from './search';
import searchTerm from './searchTerm';

export default combineReducers({
  collection,
  currentUser,
  errors,
  searchResults,
  searchTerm,
});
