import { fetchData } from '../../utils/api';
import { setCollection, removeItem } from '../actions/collection';

export const fetchCollection = username => async (dispatch) => {
  const path = `/v2/users/${username}/collection`;

  const data = await fetchData('get', path)
    .then(res => res.data.user.collection)
    .catch(err => err);
  dispatch(setCollection(data));
  return data;
};

export const fetchRemoveItem = (username, id) => (dispatch) => {
  const path = `/v2/users/${username}/collection/${id}`;

  return fetchData('delete', path)
    .then(() => {
      dispatch(removeItem(id));
    });
};
