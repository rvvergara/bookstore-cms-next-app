import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../../utils/initialize';
import Layout from '../../../components/Layout';
import UserForm from '../../../components/UserForm';
import { setAuthorizationToken } from '../../../utils/api';

const User = ({ currentUser }) => {
  let first_name;
  let last_name;
  let fullName;
  if (currentUser.authenticated) {
    first_name = currentUser.data.first_name;
    last_name = currentUser.data.last_name;
    fullName = `${first_name} ${last_name}`;
    setAuthorizationToken(currentUser.data.token);
  }
  return (
    <Layout title={`Edit Account - ${fullName}`}>
      <UserForm />
    </Layout>
  );
};

User.getInitialProps = (ctx) => {
  initialize(ctx);
  const { query, store } = ctx;
  const { currentUser } = store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  if (currentUser.data.username !== query.username) {
    return redirect(ctx, `/users/${currentUser.data.username}`);
  }
};

export default connect(state => state)(User);
