import { fetchData } from '../../utils/api';
import { setBook } from '../actions/book';
import { setDisplayedBooks } from '../actions/library';
import { getUnique, sanitizeBooks } from '../../utils/arrayProcessing';
import { listSearchResults } from '../actions/search';

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

export const googleBookSearch = (keyword, queryPage) => async (dispatch) => {
  const page = queryPage || 1;
  const startIndex = (page - 1) * 40;
  const path = `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40&startIndex=${startIndex}&orderBy=relevance`;

  const rawItems = await fetchData('get', path).then(res => res.data.items)
    .then(books => sanitizeBooks(books))
    .then(sanitizedBooks => getUnique(sanitizedBooks))
    .then(uniqueItems => uniqueItems.slice(startIndex, 10))
    .then(googleBooks => dispatch(listSearchResults(googleBooks)))
    .catch(err => console.log(err));

  return rawItems;
};
