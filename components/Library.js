import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import GoogleBookItem from './GoogleBookItem';
import LibraryItem from './LibraryItem';
import { listSearchResults } from '../redux/actions/search';
import { setSearchTerm } from '../redux/actions/searchTerm';
import { setDisplayedBooks } from '../redux/actions/library';

const Library = ({
  searchResults,
  listSearchResults,
  setSearchTerm,
  displayedBooks,
  setDisplayedBooks,
}) => {
  const router = useRouter();
  const isSearchPage = router.pathname.includes('search');
  useEffect(() => () => {
    if (isSearchPage) {
      listSearchResults([]);
      setSearchTerm('');
    } else {
      setDisplayedBooks([]);
    }
  }, []);
  const setToDisplay = router.pathname.includes('search') ? searchResults : displayedBooks;
  return (
    setToDisplay.map((book) => {
      if (router.pathname.includes('admin')) {
        return (
          <GoogleBookItem key={book.id} book={book} />
        );
      }
      return (
        <LibraryItem
          key={book.book_id}
          book={book}
        />
      );
    })
  );
};

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  displayedBooks: state.displayedBooks,
});

export default connect(
  mapStateToProps,
  {
    listSearchResults,
    setSearchTerm,
    setDisplayedBooks,
  },
)(Library);
