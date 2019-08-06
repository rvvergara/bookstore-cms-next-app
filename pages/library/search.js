import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import Library from '../../components/Library';
import SearchForm from '../../components/SearchForm';
import { setAuthorizationToken } from '../../utils/api';
import { searchLibrary } from '../../redux/thunks/search';
import Pagination from '../../components/Pagination';

const Search = ({ searchTerm, count: maxCount, page }) => {
  const pagesCount = Math.ceil(maxCount / 10);
  const pageNumbers = [...Array(pagesCount).keys()].map(el => el + 1);
  return (
    <Layout title={`Search - ${searchTerm}`}>
      <SearchForm />
      <h4 className="search-result-heading">
        { maxCount }
        {' '}
    Search results for
        {' '}
        {searchTerm}
      </h4>
      <Library />
      <Pagination
        pages={pageNumbers}
        queryPage={page}
        path={`/library/search?q=${searchTerm}`}
      />
    </Layout>
  );
};

Search.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  const page = Number(ctx.query.page) || 1;
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
  return { count, page };
};

export default connect(state => state)(Search);
