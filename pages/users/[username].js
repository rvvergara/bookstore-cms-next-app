import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';

const User = ({ currentUser }) => {
  const { first_name } = currentUser.data;
  const { last_name } = currentUser.data;
  const fullName = `${first_name} ${last_name}`;
  return (
    <Layout title={fullName}>
      <h3>{fullName}</h3>
    </Layout>
  );
};

User.getInitialProps = (ctx) => {
  initialize(ctx);
  const { currentUser } = ctx.store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
};

export default connect(state => state)(User);
