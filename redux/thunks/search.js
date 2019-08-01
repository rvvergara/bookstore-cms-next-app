import Router from 'next/router';
import { dispatch } from 'rxjs/internal/observable/range';
import { fetchData } from '../../utils/api';
import { listSearchResults } from '../actions/search';
import { setSearchTerm } from '../actions/searchTerm';

export const searchLibrary = keyword => async (dispatch) => {
  const path = `/v1/search/books?q=${keyword}`;
  const results = await fetchData('get', path)
    .then((res) => {
      dispatch(listSearchResults(res.data.books));
    })
    .then(() => dispatch(setSearchTerm(keyword)))
    // .then(() => {
    //   Router.push(`/library/search?q=${keyword}`);
    // })
    .catch(err => console.log(err));
};
