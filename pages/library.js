import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import Library from '../components/Library';
import Pagination from '../components/Pagination';
import { setAuthorizationToken } from '../utils/api';
import { fetchBooksFromLibrary } from '../redux/thunks/library';

const LibraryPage = ({
  books, page, count: maxCount, displayedBooks, errors,
}) => {
  const currentCount = books.length + (page - 1) * 10;
  const pagesCount = Math.ceil(maxCount / 10);
  const pageNumbers = [...Array(pagesCount).keys()].map(el => el + 1);
  const title = errors ? 'Error' : 'Books';
  return (
    <Layout title={title}>
      {!errors && (
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
      )}
      {
        errors && (
          <h3>Network Error</h3>
        )
      }
      <Library />
      <Pagination
        pages={pageNumbers}
        queryPage={page}
        path="/library?"
        resultsCount={displayedBooks.length}
      />
    </Layout>
  );
};

LibraryPage.getInitialProps = async (ctx) => {
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

export default connect(state => state)(LibraryPage);
