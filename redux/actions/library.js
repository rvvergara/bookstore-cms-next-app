import { SET_DISPLAYED_BOOKS } from './actionTypes';

export const setDisplayedBooks = books => ({
  type: SET_DISPLAYED_BOOKS,
  books,
});
