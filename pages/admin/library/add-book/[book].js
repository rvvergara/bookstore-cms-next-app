import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../../../utils/initialize';
import { setAuthorizationToken } from '../../../../utils/api';
import { fetchGoogleBook } from '../../../../redux/thunks/search';
import Layout from '../../../../components/Layout';
import BookForm from '../../../../components/BookForm';

const NewBookPage = ({ currentUser }) => {
  if (currentUser.authenticated) {
    setAuthorizationToken(currentUser.data.token);
  }
  return (
    <Layout title="Add To Library">
      <h3>New Book Page</h3>
      <BookForm />
    </Layout>
  );
};

NewBookPage.getInitialProps = async (ctx) => {
  initialize(ctx);
  const { store, query } = ctx;
  const { getState, dispatch } = store;
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
    const book = await dispatch(fetchGoogleBook(query.book, token));
  } catch (err) {
    err;
  }
};

export default connect(state => state)(NewBookPage);
