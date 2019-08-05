import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import { setAuthorizationToken } from '../utils/api';
import { fetchBooksFromLibrary } from '../redux/thunks/library';

const Library = ({ displayedBooks: books }) => (
  <Layout title="Books">
    <h3>BOOKS HERE ON PAGE</h3>
    {
      books.map(book => (
        <h4 key={book.book_id}>{book.title}</h4>
      ))
    }
  </Layout>
);

Library.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { currentUser } = store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  try {
    setAuthorizationToken(currentUser.data.token);
    await store.dispatch(fetchBooksFromLibrary(query.page));
  } catch (err) {
    console.log(err);
  }
  return { };
};

export default connect(state => state)(Library);
