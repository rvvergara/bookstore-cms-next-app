import { fetchData } from '../../utils/api';
import {
  addItem,
  setCollection,
  removeItem,
  updatePage,
} from '../actions/collection';
import { setErrors } from '../actions/errors';

export const fetchCollection = username => async (dispatch) => {
  const path = `/v1/users/${username}/collection`;
  try {
    const res = await fetchData('get', path);
    const { collection } = res.data.user;
    dispatch(setCollection(collection));
    return collection;
  } catch (err) {
    dispatch(setErrors(err.message));
  }
};

export const fetchAddItem = (username, item) => async (dispatch) => {
  const path = `/v1/users/${username}/collection`;
  try {
    const res = await fetchData('post', path, item);
    const newItem = res.data.collection_item;
    dispatch(addItem(newItem));
  } catch (err) {
    dispatch(setErrors(err.message));
  }
};

export const fetchUpdatePage = (username, item_id, newPage) => async (dispatch) => {
  const path = `/v1/users/${username}/collection/${item_id}`;
  try {
    await fetchData('put', path, { current_page: newPage });
    dispatch(updatePage(item_id, newPage));
  } catch (err) {
    dispatch(setErrors(err.message));
    return Promise.reject(err.message);
  }
};

export const fetchRemoveItem = (username, id) => async (dispatch) => {
  const path = `/v1/users/${username}/collection/${id}`;
  try {
    await fetchData('delete', path);
    dispatch(removeItem(id));
  } catch (err) {
    dispatch(setErrors(err.message));
  }
};
