import { useEffect } from 'react';
import { connect } from 'react-redux';
import LibrarySearchResultItem from './LibrarySearchResultItem';
import { listSearchResults } from '../redux/actions/search';
import { setSearchTerm } from '../redux/actions/searchTerm';

const LibrarySearchResult = ({
  searchResults,
  listSearchResults,
  setSearchTerm,
}) => {
  useEffect(() => () => {
    listSearchResults([]);
    setSearchTerm('');
  }, [listSearchResults]);
  return (
    searchResults.map(book => (
      <LibrarySearchResultItem
        key={book.book_id}
        book={book}
      />
    ))
  );
};

const mapStateToProps = state => ({
  searchResults: state.searchResults,
});

export default connect(mapStateToProps, { listSearchResults, setSearchTerm })(LibrarySearchResult);
