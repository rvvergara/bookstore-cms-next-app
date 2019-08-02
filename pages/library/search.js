import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import LibrarySearchResultItemm from '../../components/LibrarySearchResultItem';
import SearchForm from '../../components/SearchForm';
import { setAuthorizationToken } from '../../utils/api';
import { searchLibrary } from '../../redux/thunks/search';

const Search = ({ searchResults, searchTerm }) => (
  <Layout title={`Search - ${searchTerm}`}>
    <SearchForm />
    <h4 className="search-result-heading">
      Search results for
      {' '}
      {searchTerm}
    </h4>
    {
      searchResults.map(book => (
        <LibrarySearchResultItemm
          key={book.book_id}
          book={book}
        />
      ))
    }
  </Layout>
);

Search.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  let searchResults;
  let searchTerm;
  try {
    setAuthorizationToken(currentUser.data.token);
    const { dispatch, getState } = ctx.store;
    searchResults = await dispatch(searchLibrary(ctx.query.q))
      .then(() => {
        searchTerm = getState().searchTerm;
      });
  } catch (err) {
    searchResults = [];
    searchTerm = '';
  }
  return { searchResults, searchTerm };
};

export default connect(state => state)(Search);
