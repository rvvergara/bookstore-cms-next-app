import { LIST_SEARCH_RESULTS } from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case LIST_SEARCH_RESULTS:
      return action.searchResults;
    default:
      return state;
  }
};
