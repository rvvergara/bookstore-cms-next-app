import {
  REMOVE_ITEM,
  SET_COLLECTION,
  UPDATE_PAGE,
} from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case SET_COLLECTION:
      return action.collection;
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.id);
    case UPDATE_PAGE:
    {
      const { item_id, newPage } = action;
      const itemIndex = state.findIndex(item => item.item_id === item_id);
      const newState = [...state];
      newState[itemIndex] = { ...newState[itemIndex], current_page: newPage };
      return newState;
    }
    default:
      return state;
  }
};
