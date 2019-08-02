import { fetchData } from '../../utils/api';
import { setBook } from '../actions/book';

export const fetchBook = id => async (dispatch) => {
  const path = `/v1/books/${id}`;
  return await fetchData('get', path)
    .then((res) => {
      dispatch(setBook(res.data.book));
      return res.data;
    });
};
