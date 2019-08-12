import { fetchData } from '../../utils/api';
import { setBook } from '../actions/book';
import { setDisplayedBooks } from '../actions/library';

export const fetchBook = id => async (dispatch) => {
  const path = `/v1/books/${id}`;
  return fetchData('get', path)
    .then((res) => {
      dispatch(setBook(res.data.book));
      return res.data;
    });
};

export const fetchBooksFromLibrary = page => async (dispatch) => {
  const path = page ? `/v1/books?page=${page}` : '/v1/books';

  return fetchData('get', path)
    .then((res) => {
      dispatch(setDisplayedBooks(res.data.books));
      return { books: res.data.books, count: res.data.count };
    });
};

export const fetchUpdateBook = (book_id, data) => async (dispatch) => {
  const path = `/v1/books/${book_id}`;
  try {
    const res = await fetchData('put', path, data);
    const { book } = res.data;
    dispatch(setBook(book));
    return book;
  } catch (err) {
    console.log(err);
  }
};
