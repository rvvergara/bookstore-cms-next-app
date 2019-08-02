import { SET_BOOK } from '../actions/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case SET_BOOK:
      return action.book;
    default:
      return state;
  }
};
