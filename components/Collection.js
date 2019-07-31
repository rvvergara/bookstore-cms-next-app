import { connect } from 'react-redux';
import CollectionItem from './CollectionItem';

const Collection = ({ collection }) => (
  <div>
    {collection.map(item => (
      <CollectionItem
        key={item.id}
        item={item}
      />
    ))}
  </div>
);

const mapStateToProps = state => ({
  collection: state.collection,
});
export default connect(mapStateToProps)(Collection);
