import { connect } from 'react-redux';
import redirect from 'next-redirect';
import initialize from '../../../../utils/initialize';
import { setAuthorizationToken } from '../../../../utils/api';
import { fetchBook } from '../../../../redux/thunks/library';
import Layout from '../../../../components/Layout';
import BookForm from '../../../../components/BookForm';

const EditBookPage = ({ book, currentUser }) => {
  if (currentUser.authenticated) { setAuthorizationToken(currentUser.data.token); }
  return (
    <Layout title={`Edit - ${book.title}`}>
      <h3>Edit Book Page</h3>
      <BookForm />
    </Layout>
  );
};

EditBookPage.getInitialProps = async (ctx) => {
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
    await dispatch(fetchBook(query.book));
  } catch (err) {
    err;
  }
  return { };
};

export default connect(state => state)(EditBookPage);
