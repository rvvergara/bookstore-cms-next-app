import { connect } from 'react-redux';

const Index = ({ currentUser }) => (
  <div>
    <h1>Bookstore CMS</h1>
    <p>{currentUser.data.username}</p>
  </div>
);

Index.getInitialProps = ({ store }) => ({
  currentUser: store.currentUser,
});

export default connect(state => state)(Index);
