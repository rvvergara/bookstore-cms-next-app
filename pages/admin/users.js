import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import UserList from '../../components/UserList';
import { setAuthorizationToken } from '../../utils/api';
import { fetchUsers } from '../../redux/thunks/user';
import { setErrors } from '../../redux/actions/errors';

const UsersPageForAdmin = ({ users, count, page }) => {
  const currentCount = users.length + (page - 1) * 10;
  const shownCount = currentCount - users.length + 1;
  const pagesCount = Math.ceil(count / 10);
  const pageNumbers = [...Array(pagesCount).keys()].map(el => el + 1);
  return (
    <Layout title="Manage Users">
      <h4>
        Showing
        {' '}
        {shownCount}
        {' '}
        to
        {' '}
        { currentCount }
        {' '}
        of
        {' '}
        {count}
        {' '}
        users
      </h4>
      <UserList />
      <Pagination
        pages={pageNumbers}
        queryPage={page}
        path="/admin/users?"
      />
    </Layout>
  );
};

UsersPageForAdmin.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { currentUser } = store.getState();
  const page = Number(query.page) || 1;
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  if (currentUser.data.access_level < 3) {
    return redirect(ctx, '/admin');
  }
  let users;
  let count;
  try {
    setAuthorizationToken(currentUser.data.token);
    const data = await store.dispatch(fetchUsers(page));
    users = data.users;
    count = data.count;
  } catch (err) {
    err;
    users = [];
    count = 0;
  }
  return { users, count, page };
};

export default connect(state => state)(UsersPageForAdmin);
