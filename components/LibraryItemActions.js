import { connect } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setAuthorizationToken } from '../utils/api';
import { fetchAddItem, fetchRemoveItem } from '../redux/thunks/collection';
import { fetchBooksFromLibrary } from '../redux/thunks/library';

const LibraryItemActions = ({
  book, currentUser, fetchAddItem, fetchRemoveItem, fetchBooksFromLibrary,
}) => {
  const { book_id, included, item_id } = book;
  const { access_level, username, token } = currentUser.data;
  const router = useRouter();
  const { page } = router.query;

  const handleClick = () => {
    setAuthorizationToken(token);
    if (book.included) {
      fetchRemoveItem(username, item_id)
        .then(() => fetchBooksFromLibrary(page));
    } else {
      fetchAddItem(username, book)
        .then(() => fetchBooksFromLibrary(page));
    }
  };
  return (
    <div className="library-item__actions">
      <Link
        href="/library/[book]"
        as={`/library/${book_id}`}
      >
        <a className="library-item__actions__link">
        Details
        </a>
      </Link>
      <button
        type="button"
        className="library-item__actions__link"
        onClick={handleClick}
      >
        { included ? 'Remove From Collection' : 'Add To Collection'}
      </button>
      {
      access_level > 1 && (
        <Link
          href="#"
        >
          <a className="library-item__actions__link">
            Admin Options
          </a>
        </Link>
      )
    }
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { fetchAddItem, fetchRemoveItem, fetchBooksFromLibrary })(LibraryItemActions);
