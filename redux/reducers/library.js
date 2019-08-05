import { SET_DISPLAYED_BOOKS } from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case SET_DISPLAYED_BOOKS:
      return action.books;
    default:
      return state;
  }
};
