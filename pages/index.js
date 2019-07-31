import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import { fetchCollection } from '../redux/thunks/collection';
import { setAuthorizationToken } from '../utils/api';

const Index = ({ collection }) => (
  <Layout title="Home" />
);
Index.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  let collection;

  try {
    setAuthorizationToken(currentUser.data.token);
    collection = await ctx.store.dispatch(fetchCollection(currentUser.data.username));
  } catch (err) {
    console.log('NETWORK ERROR');
  }
  return { collection };
};

export default connect(state => state)(Index);
