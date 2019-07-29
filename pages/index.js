import { connect } from 'react-redux';
import initialize from '../utils/initialize';


const Index = ({ currentUser }) => (
  <div>
    <h1>Bookstore CMS</h1>
    <p>{currentUser.data.username}</p>
  </div>
);

Index.getInitialProps = ctx => initialize(ctx);

export default connect(state => state)(Index);
