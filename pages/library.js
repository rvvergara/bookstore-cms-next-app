import { connect } from 'react-redux';
import redirect from 'next-redirect';
import Link from 'next/link';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import { setAuthorizationToken } from '../utils/api';
import { fetchBooksFromLibrary } from '../redux/thunks/library';

const Library = ({ books, page }) => (
  <Layout title="Books">
    <h3>BOOKS HERE ON PAGE</h3>
    {
      books.map(book => (
        <h4 key={book.book_id}>{book.title}</h4>
      ))
    }
    {
      page > 1 && (
        <Link href={`/library?page=${page - 1}`}>
          <a>
            Previous Page
          </a>
        </Link>
      )
    }
    <Link href={`/library?page=${page + 1}`}>
      <a>
        Next Page
      </a>
    </Link>
  </Layout>
);

Library.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { currentUser } = store.getState();
  const page = Number(query.page) || 1;
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  let books;
  try {
    setAuthorizationToken(currentUser.data.token);
    books = await store.dispatch(fetchBooksFromLibrary(page));
  } catch (err) {
    books = [];
  }
  return { books, page };
};

export default connect(state => state)(Library);
