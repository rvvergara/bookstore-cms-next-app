import { combineReducers } from 'redux';
import book from './book';
import collection from './collection';
import currentUser from './currentUser';
import errors from './errors';
import displayedBooks from './library';
import pageUpdateMode from './pageUpdateMode';
import searchResults from './search';
import searchTerm from './searchTerm';

export default combineReducers({
  book,
  collection,
  currentUser,
  displayedBooks,
  errors,
  pageUpdateMode,
  searchResults,
  searchTerm,
});
