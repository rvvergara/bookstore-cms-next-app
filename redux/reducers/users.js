import { LIST_USERS } from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case LIST_USERS:
      return action.users;
    default:
      return state;
  }
};
