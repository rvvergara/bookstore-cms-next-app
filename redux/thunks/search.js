import { fetchData, googleBookSearch } from '../../utils/api';
import { listSearchResults } from '../actions/search';
import { setSearchTerm } from '../actions/searchTerm';
import { getUnique, sanitizeBooks } from '../../utils/arrayProcessing';

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

export const searchGoogle = (keyword, page) => async dispatch => googleBookSearch(keyword, page)
  .then((res) => {
    const books = res.data.items.map(({ id, volumeInfo }) => ({ id, ...volumeInfo }));
    const count = res.data.totalItems;
    return { books, count };
  })
  .then(({ books, count }) => ({ books: getUnique(books, 'id'), count }))
  .then(({ books, count }) => ({ books: sanitizeBooks(books), count }))
  .then(({ books, count }) => {
    const slicedBooks = books.slice(0, 10);
    dispatch(listSearchResults(slicedBooks));
    dispatch(setSearchTerm(keyword));
    return { books: slicedBooks, count };
  })
  .catch(err => console.log('ERRORS HERE', err));
