import {
  ADD_ITEM,
  REMOVE_ITEM,
  SET_COLLECTION,
  SWITCH_PAGE_UPDATE,
  UPDATE_PAGE,
} from './actionTypes';

export const addItem = item => ({
  type: ADD_ITEM,
  item,
});

export const setCollection = collection => ({
  type: SET_COLLECTION,
  collection,
});

export const removeItem = item_id => ({
  type: REMOVE_ITEM,
  item_id,
});

export const switchPageUpdate = item_id => ({
  type: SWITCH_PAGE_UPDATE,
  item_id,
});

export const updatePage = (item_id, newPage) => ({
  type: UPDATE_PAGE,
  item_id,
  newPage,
});
