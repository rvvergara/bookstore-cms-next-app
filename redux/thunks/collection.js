import { fetchData } from '../../utils/api';
import { setCollection, removeItem, updatePage } from '../actions/collection';
import { setErrors } from '../actions/errors';

export const fetchCollection = username => async (dispatch) => {
  const path = `/v1/users/${username}/collection`;

  const data = await fetchData('get', path)
    .then(res => res.data.user.collection)
    .catch(err => err);
  dispatch(setCollection(data));
  return data;
};

export const fetchUpdatePage = (username, item_id, newPage) => (dispatch) => {
  const path = `/v1/users/${username}/collection/${item_id}`;

  return fetchData('put', path, { current_page: newPage })
    .then(() => dispatch(updatePage(item_id, newPage)))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
      return Promise.reject();
    });
};

export const fetchRemoveItem = (username, id) => (dispatch) => {
  const path = `/v1/users/${username}/collection/${id}`;

  return fetchData('delete', path)
    .then(() => {
      dispatch(removeItem(id));
    });
};
