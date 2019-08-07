import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import AdminBookList from '../../components/AdminBookList';
import { setAuthorizationToken } from '../../utils/api';

const LibraryPageForAdmin = ({ displayedBooks, count, page }) =>
  // const currentCount = displayedBooks.length + (page - 1) * 10;
  // const shownCount = currentCount - displayedBooks.length + 1;
  // const pagesCount = Math.ceil(count / 10);
  // const pageNumbers = [...Array(pagesCount).keys()].map(el => el + 1);
  (
    <Layout title="Manage Books">
      <AdminBookList />
    </Layout>
  );

LibraryPageForAdmin.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { currentUser } = store.getState();
  const page = Number(query.page) || 1;
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  if (currentUser.data.access_level < 2) {
    return redirect('/');
  }
  try {
    setAuthorizationToken(currentUser.data.token);
  } catch (err) {
    err;
  }
  return { };
};

export default connect(state => state)(LibraryPageForAdmin);
