import {
  SWITCH_PAGE_UPDATE,
} from '../actions/actionTypes';

const defaultState = {
  on: false,
  item_id: null,
};

export default (state = defaultState, action) => {
  if (action.type === SWITCH_PAGE_UPDATE) {
    return state.on ? { on: false, item_id: null } : { on: true, item_id: action.item_id };
  }
  return state;
};
