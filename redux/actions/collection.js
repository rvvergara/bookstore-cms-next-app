import { SET_COLLECTION, REMOVE_ITEM } from './actionTypes';

export const setCollection = collection => ({
  type: SET_COLLECTION,
  collection,
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  id,
});
