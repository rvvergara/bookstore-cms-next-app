import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';
import Collection from '../components/Collection';
import { fetchCollection } from '../redux/thunks/collection';
import { setAuthorizationToken } from '../utils/api';

const Index = ({ currentUser }) => {
  try {
    setAuthorizationToken(currentUser.data.token);
  } catch (err) {
    // console.log('Index Page Error', err);
    err;
  }
  return (
    <Layout title="Home">
      <Collection />
    </Layout>
  );
};
Index.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  try {
    setAuthorizationToken(currentUser.data.token);
    await ctx.store.dispatch(fetchCollection(currentUser.data.username));
  } catch (err) {
    console.log('Something went wrong', err);
  }
  return { currentUser };
};

export default connect(state => state)(Index);
