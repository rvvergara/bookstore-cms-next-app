import { connect } from 'react-redux';
import redirect from 'next-redirect';
import { useRouter } from 'next/router';
import initialize from '../../utils/initialize';
import Layout from '../../components/Layout';
import Collection from '../../components/Collection';
import { setAuthorizationToken } from '../../utils/api';
import { fetchUserData } from '../../redux/thunks/user';
import { setCollection } from '../../redux/actions/collection';

const User = ({ user, error }) => {
  const router = useRouter();
  if (!user) {
    return (
      <Layout title={error}>
        <p>{error}</p>
        <button
          className="logout-btn"
          type="button"
          onClick={router.back}
        >
          Back
        </button>
      </Layout>
    );
  }
  const { first_name, last_name, username } = user;
  const fullName = `${first_name} ${last_name}`;
  return (
    <Layout title={fullName}>
      <h3>
        {fullName}
        's Collection
      </h3>
      <Collection />
    </Layout>
  );
};

User.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { currentUser } = store.getState();
  if (!currentUser.authenticated) {
    return redirect(ctx, '/login');
  }
  let user;
  try {
    setAuthorizationToken(currentUser.data.token);
    user = await store.dispatch(fetchUserData(query.username));
    ctx.store.dispatch(setCollection(user.collection));
    return { user };
  } catch (err) {
    const error = err;
    return { error, user: null, collection: [] };
  }
};

export default connect(state => state)(User);
