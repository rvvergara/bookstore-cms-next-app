import { setCollection } from '../actions/collection';

export const fetchCollection = username => (dispatch) => {
  const path = `/v1/users/${username}/collection`;

  return fetchData('get', path)
    .then((res) => {
      dispatch(setCollection(res.data.user.collection));
    });
};
