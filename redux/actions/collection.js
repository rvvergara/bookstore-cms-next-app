import {
  REMOVE_ITEM,
  SET_COLLECTION,
  SWITCH_PAGE_UPDATE,
  UPDATE_PAGE,
} from './actionTypes';

export const setCollection = collection => ({
  type: SET_COLLECTION,
  collection,
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  id,
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
