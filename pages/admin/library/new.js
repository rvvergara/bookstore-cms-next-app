import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../../utils/initialize';
import { setAuthorizationToken } from '../../../utils/api';
import Layout from '../../../components/Layout';

const NewBookPage = () => (
  <Layout title="Add To Library"><h3>New Book Page</h3></Layout>
);

NewBookPage.getInitialProps = (ctx) => {
  initialize(ctx);
  const { store } = ctx;
  const { getState } = store;
  const { currentUser } = getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  if (currentUser.data.access_level < 2) {
    return redirect(ctx, '/');
  }
  try {
    const { token } = currentUser.data;
    setAuthorizationToken(token);
  } catch (err) {
    err;
  }
};

export default connect(state => state)(NewBookPage);
