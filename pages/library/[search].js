import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import { setAuthorizationToken } from '../../utils/api';
import { searchLibrary } from '../../redux/thunks/search';

const Search = ({ searchResults, searchTerm }) => (
  <Layout title={`Search - ${searchTerm}`}>
    <h2>
      Search Results for
      {' '}
      {searchTerm}
    </h2>
    {
      searchResults.map(result => (
        <h4 key={result.book_id}>{result.title}</h4>
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
