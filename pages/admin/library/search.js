import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../../utils/initialize';
import Layout from '../../../components/Layout';
import Pagination from '../../../components/Pagination';
import SearchForm from '../../../components/SearchForm';
import { searchGoogle } from '../../../redux/thunks/search';
import { setAuthorizationToken } from '../../../utils/api';

const AdminSearchPage = ({
  searchResults,
  searchTerm,
  page,
}) => (
  <Layout title="Google API Search">
    <h3>Admin Search Page</h3>
    <SearchForm />
    <Pagination
      queryPage={page}
      path={`/admin/library/search?q=${searchTerm}`}
      resultsCount={searchResults.length}
    />
  </Layout>
);

AdminSearchPage.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  const page = Number(ctx.query.page) || 1;
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  try {
    setAuthorizationToken(currentUser.data.token);
    const { store, query } = ctx;
    const { dispatch } = store;
    await dispatch(searchGoogle(query.q, query.page));
  } catch (err) {
    err;
  }
  return { page };
};

export default connect(state => state)(AdminSearchPage);
