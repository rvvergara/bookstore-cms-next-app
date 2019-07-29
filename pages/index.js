import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';

const Index = ({ currentUser }) => (
  <Layout title="Home">
    <p>{currentUser.data.username}</p>
  </Layout>
);

Index.getInitialProps = ctx => initialize(ctx);

export default connect(state => state)(Index);
