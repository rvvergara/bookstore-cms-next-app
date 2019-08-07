import { fetchData, googleBookSearch } from '../../utils/api';
import { listSearchResults } from '../actions/search';
import { setSearchTerm } from '../actions/searchTerm';
import { getUnique, sanitizeBooks } from '../../utils/arrayProcessing';

export const searchLibrary = (keyword, page) => async (dispatch) => {
  const path = page ? `/v1/search/books?q=${keyword};page=${page}` : `/v1/search/books?q=${keyword}`;
  return fetchData('get', path)
    .then((res) => {
      dispatch(listSearchResults(res.data.books));
      dispatch(setSearchTerm(keyword));
      return { books: res.data.books, count: res.data.count };
    })
    .catch(err => console.log(err));
};

export const searchGoogle = (keyword, page) => async dispatch => googleBookSearch(keyword, page)
  .then(res => res.data.items.map(({ id, volumeInfo }) => ({ id, ...volumeInfo })))
  .then(rawBooks => getUnique(rawBooks, 'id'))
  .then(uniqueBooks => sanitizeBooks(uniqueBooks))
  .then((validBooks) => {
    const queryPage = page || 1;
    const startIndex = (queryPage - 1) * 40;
    dispatch(listSearchResults(validBooks.slice(startIndex, 10)));
  })
  .then(() => dispatch(setSearchTerm(keyword)))
  .catch(() => console.log('ERRORS'));
