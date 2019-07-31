import Layout from '../components/Layout';
import UserForm from '../components/UserForm';
import { setErrors } from '../redux/actions/errors';

export const SignUp = () => (
  <Layout title="Sign Up">
    <UserForm />
  </Layout>
);

SignUp.getInitialProps = (ctx) => {
  ctx.store.dispatch(setErrors(null));
};

export default SignUp;
