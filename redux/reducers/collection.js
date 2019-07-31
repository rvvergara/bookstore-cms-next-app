import { SET_COLLECTION, REMOVE_ITEM } from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case SET_COLLECTION:
      return action.collection;
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};
