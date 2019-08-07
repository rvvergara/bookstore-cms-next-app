import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import { setAuthorizationToken } from '../../utils/api';
import { fetchUsers } from '../../redux/thunks/user';

const UsersPageForAdmin = ({ users, count }) => (
  <Layout title="Manage Users">
    <h4>Users List Here</h4>
    {
      users.map(user => <h5 key={user.id}>{user.first_name}</h5>)
    }
  </Layout>
);

UsersPageForAdmin.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { currentUser } = store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  let users;
  let count;
  try {
    setAuthorizationToken(currentUser.data.token);
    const data = await store.dispatch(fetchUsers(query.page));
    users = data.users;
    count = data.count;
  } catch (err) {
    err;
    users = [];
    count = 0;
  }
  return { users, count };
};

export default connect(state => state)(UsersPageForAdmin);
