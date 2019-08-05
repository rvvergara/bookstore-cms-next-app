import { connect } from 'react-redux';
import redirect from 'next-redirect';
import Link from 'next/link';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import LibrarySearchResultItem from '../components/LibrarySearchResultItem';
import { setAuthorizationToken } from '../utils/api';
import { fetchBooksFromLibrary } from '../redux/thunks/library';

const Library = ({ books, page, count: maxCount }) => {
  const currentCount = books.length + (page - 1) * 10;
  return (
    <Layout title="Books">
      <h3>
        Showing
        {' '}
        {currentCount - books.length + 1}
        {' '}
        to
        {' '}
        {currentCount}
        {' '}
        of
        {' '}
        {maxCount}
        {' '}
        books
      </h3>
      {
      books.map(book => (
        <LibrarySearchResultItem
          key={book.book_id}
          book={book}
        />
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
      {
        currentCount < maxCount && (
        <Link href={`/library?page=${page + 1}`}>
          <a>
        Next Page
          </a>
        </Link>
        )
    }
    </Layout>
  );
};

Library.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { currentUser } = store.getState();
  const page = Number(query.page) || 1;
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  let books;
  let count;
  try {
    setAuthorizationToken(currentUser.data.token);
    const data = await store.dispatch(fetchBooksFromLibrary(page));
    books = data.books;
    count = data.count;
  } catch (err) {
    books = [];
    count = 0;
  }
  return { books, count, page };
};

export default connect(state => state)(Library);
