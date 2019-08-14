import { fetchData } from '../../utils/api';
import { setBook } from '../actions/book';
import { setDisplayedBooks } from '../actions/library';
import { setErrors } from '../actions/errors';

export const fetchBook = id => async (dispatch) => {
  const path = `/v1/books/${id}`;
  try {
    const res = await fetchData('get', path);
    const { book } = res.data;
    dispatch(setBook(book));
    return book;
  } catch (err) {
    dispatch(setErrors(err.message));
  }
};

export const fetchBooksFromLibrary = page => async (dispatch) => {
  const path = page ? `/v1/books?page=${page}` : '/v1/books';
  try {
    const res = await fetchData('get', path);
    const { books } = res.data;
    const { count } = res.data;
    dispatch(setDisplayedBooks(books));
    return { books, count };
  } catch (err) {
    console.log('ERROR FROM RAILS', err);
  }
};

export const fetchAddBook = (book_id, bookData) => async (dispatch) => {
  const path = '/v1/books';
  try {
    const res = await fetchData('post', path, bookData);
    const { book } = res.data;
    dispatch(setBook(book));
    return book;
  } catch (err) {
    console.log('ERROR FROM RAILS', err);
  }
};

export const fetchUpdateBook = (book_id, data) => async (dispatch) => {
  const path = `/v1/books/${book_id}`;
  try {
    const res = await fetchData('put', path, data);
    const { book } = res.data;
    dispatch(setBook(book));
    return book;
  } catch (err) {
    console.log('ERROR FROM RAILS', err);
  }
};
