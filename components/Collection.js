import { connect } from 'react-redux';

const Collection = ({ collection }) => collection.map(item => (
  <h4 key={item.id}>
      {item.title}
    </h4>
));

const mapStateToProps = state => ({
  collection: state.collection,
});
export default connect(mapStateToProps)(Collection);
