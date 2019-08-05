import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import Book from '../../components/Book';
import { setAuthorizationToken } from '../../utils/api';
import { fetchBook } from '../../redux/thunks/library';

const BookPage = ({ book }) => (
  <Layout title={`${book.title}`}>
    <Book />
  </Layout>
);

BookPage.getInitialProps = async (ctx) => {
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

export default connect(state => state)(BookPage);
