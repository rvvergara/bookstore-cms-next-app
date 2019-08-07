import { connect } from 'react-redux';
import redirect from 'next-redirect';
import Link from 'next/link';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import { setAuthorizationToken } from '../utils/api';

const AdminPage = ({ currentUser }) => (
  <Layout title="Admin">
    <div>
      {
        currentUser.data && currentUser.data.access_level > 2 && (
        <Link href="/admin/users">
          <a>Manage Users</a>
        </Link>
        )}
    </div>
    <div>
      <Link href="/admin/library">
        <a>Manage Library</a>
      </Link>
    </div>
  </Layout>
);

AdminPage.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store } = ctx;
  const { currentUser } = store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  if (currentUser.data.access_level < 2) {
    return redirect(ctx, '/');
  }
  try {
    setAuthorizationToken(currentUser.data.token);
  } catch (err) {
    err;
  }
  return { };
};
export default connect(state => state)(AdminPage);
