import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';

const Index = ({ currentUser }) => (
  <Layout title="Home" />
);

Index.getInitialProps = (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
};

export default connect(state => state)(Index);
