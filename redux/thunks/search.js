import {
  fetchData, googleBookSearch, setAuthorizationToken, googleBookSearchSingleBook,
} from '../../utils/api';
import { listSearchResults } from '../actions/search';
import { setSearchTerm } from '../actions/searchTerm';
import { setBook } from '../actions/book';
import { processGoogleBooksResults, processGoogleBook } from '../../utils/arrayProcessing';

export const searchLibrary = (keyword, page) => async (dispatch) => {
  const path = page
    ? `/v1/search/books?q=${keyword};page=${page}`
    : `/v1/search/books?q=${keyword}`;
  return fetchData('get', path)
    .then((res) => {
      dispatch(listSearchResults(res.data.books));
      dispatch(setSearchTerm(keyword));
      return { books: res.data.books, count: res.data.count };
    })
    .catch(err => console.log(err));
};

const checkLibrary = async (isbn) => {
  const path = `/v1/search/isbn?isbn=${isbn}`;
  const response = await fetchData('get', path);
  const { data } = response;
  const inLibrary = data.in_library;
  const { book_id } = data;
  return { inLibrary, book_id };
};

export const searchGoogle = (keyword, page, token) => async (dispatch) => {
  try {
    const searchResponse = await googleBookSearch(keyword, page);
    const { items } = searchResponse.data;
    setAuthorizationToken(token);
    const shownItems = await processGoogleBooksResults(items, checkLibrary);
    dispatch(listSearchResults(shownItems));
    dispatch(setSearchTerm(keyword));
    return shownItems;
  } catch (err) {
    console.log('Error in searching google', err);
    return err;
  }
};

export const fetchGoogleBook = (id, token) => async (dispatch) => {
  try {
    setAuthorizationToken(false);
    const response = await googleBookSearchSingleBook(id);
    const book = response.data.volumeInfo;
    setAuthorizationToken(token);
    const processedBook = await processGoogleBook(book, checkLibrary);
    dispatch(setBook(processedBook));
    return book;
  } catch (err) {
    console.log('Error from Google', err);
  }
};
