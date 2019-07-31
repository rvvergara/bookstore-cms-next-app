import { fetchData } from '../../utils/api';
import { setCollection } from '../actions/collection';

export const fetchCollection = username => async (dispatch) => {
  const path = `/v1/users/${username}/collection`;

  const data = await fetchData('get', path)
    .then(res => res.data.user.collection)
    .catch(err => err);
  dispatch(setCollection(data));
  return data;
};
