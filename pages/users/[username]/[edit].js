import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../../utils/initialize';
import Layout from '../../../components/Layout';
import UserForm from '../../../components/UserForm';
import { setAuthorizationToken } from '../../../utils/api';

const User = ({ currentUser }) => {
  const { first_name } = currentUser.data;
  const { last_name } = currentUser.data;
  const fullName = `${first_name} ${last_name}`;
  setAuthorizationToken(currentUser.data.token);
  return (
    <Layout title={`Edit Account - ${fullName}`}>
      <UserForm />
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
