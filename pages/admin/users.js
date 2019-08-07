import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import { setAuthorizationToken } from '../../utils/api';

const UsersPageForAdmin = () => (
  <Layout title="Manage Users">
    <h4>Users List Here</h4>
  </Layout>
);

UsersPageForAdmin.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store } = ctx;
  const { currentUser } = store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  try {
    setAuthorizationToken(currentUser.data.token);
  } catch (err) {
    err;
  }
  return { };
};

export default connect(state => state)(UsersPageForAdmin);
