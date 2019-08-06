import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import Library from '../../components/Library';
import SearchForm from '../../components/SearchForm';
import { setAuthorizationToken } from '../../utils/api';
import { searchLibrary } from '../../redux/thunks/search';

const Search = ({ searchTerm, count }) => (
  <Layout title={`Search - ${searchTerm}`}>
    <SearchForm />
    <h4 className="search-result-heading">
      { count }
      {' '}
    Search results for
      {' '}
      {searchTerm}
    </h4>
    <Library />
  </Layout>
);

Search.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  let count;
  try {
    setAuthorizationToken(currentUser.data.token);
    const { store, query } = ctx;
    const { dispatch } = store;
    const data = await dispatch(searchLibrary(query.q, query.page));
    count = data.count;
  } catch (err) {
    err;
    count = 0;
  }
  return { count };
};

export default connect(state => state)(Search);
