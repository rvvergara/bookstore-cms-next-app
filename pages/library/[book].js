import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import { setAuthorizationToken } from '../../utils/api';
import { fetchBook } from '../../redux/thunks/library';

const Book = ({ book }) => (
  <Layout title={`${book.title}`}>
    <h3>{book.title}</h3>
    <div>
      <img src={book.thumbnail} alt={book.title} />
    </div>
  </Layout>
);

Book.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { currentUser } = store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  let book;
  try {
    setAuthorizationToken(currentUser.data.token);
    book = await store.dispatch(fetchBook(query.book));
  } catch (err) {
    console.log(err);
    book = null;
  }
  return { book };
};

export default connect(state => state)(Book);
