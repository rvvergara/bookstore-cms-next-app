import { fetchData } from '../../utils/api';
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
