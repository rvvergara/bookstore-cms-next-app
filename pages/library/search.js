import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import LibrarySearchResult from '../../components/LibrarySearchResults';
import SearchForm from '../../components/SearchForm';
import { setAuthorizationToken } from '../../utils/api';
import { searchLibrary } from '../../redux/thunks/search';

const Search = ({ searchTerm }) => (
  <Layout title={`Search - ${searchTerm}`}>
    <SearchForm />
    <h4 className="search-result-heading">
      Search results for
      {' '}
      {searchTerm}
    </h4>
    <LibrarySearchResult />
  </Layout>
);

Search.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  try {
    setAuthorizationToken(currentUser.data.token);
    const { store, query } = ctx;
    const { dispatch } = store;
    await dispatch(searchLibrary(query.q));
  } catch (err) {
    err;
  }
  return { };
};

export default connect(state => state)(Search);
