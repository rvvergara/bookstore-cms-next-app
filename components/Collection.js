import { connect } from 'react-redux';
import CollectionItem from './CollectionItem';
import SearchForm from './SearchForm';
import PageUpdateModal from './PageUpdateModal';

const Collection = ({ collection, isUpdateOn }) => (
  <div>
    <SearchForm />
    {
      isUpdateOn && <PageUpdateModal />
    }
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
  isUpdateOn: state.pageUpdateMode.on,
});
export default connect(mapStateToProps)(Collection);
