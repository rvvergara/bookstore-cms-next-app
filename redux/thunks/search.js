import { fetchData } from '../../utils/api';
import { listSearchResults } from '../actions/search';
import { setSearchTerm } from '../actions/searchTerm';

export const searchLibrary = (keyword, page) => async (dispatch) => {
  const path = page ? `/v1/search/books?q=${keyword};page=${page}` : `/v1/search/books?q=${keyword}`;
  await fetchData('get', path)
    .then((res) => {
      console.log('SEARCH RESULTS', res.data);
      dispatch(listSearchResults(res.data.books));
    })
    .then(() => dispatch(setSearchTerm(keyword)))
    .catch(err => console.log(err));
};
