import { connect } from 'react-redux';
import CollectionItem from './CollectionItem';
import SearchForm from './SearchForm';

const Collection = ({ collection }) => (
  <div>
    <SearchForm />
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
