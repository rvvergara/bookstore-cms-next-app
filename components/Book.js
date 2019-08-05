import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { fetchAddItem, fetchRemoveItem } from '../redux/thunks/collection';
import { setAuthorizationToken } from '../utils/api';
import { fetchBook } from '../redux/thunks/library';

const Book = ({
  book,
  fetchBook,
  fetchAddItem,
  fetchRemoveItem,
  username,
  token,
}) => {
  const router = useRouter();
  const handleClick = () => {
    setAuthorizationToken(token);
    if (book.included) {
      fetchRemoveItem(username, book.item_id)
        .then(() => fetchBook(book.book_id));
    } else {
      fetchAddItem(username, book)
        .then(() => fetchBook(book.book_id));
    }
  };
  return (
    <div className="book-container">
      <h3>
        {book.title}
        {' '}
-
        {' '}
        {book.subtitle}
      </h3>
      <h4>
        { book.authors }
      </h4>
      <div>
        <img src={book.thumbnail} alt={book.title} />
        <p>
          { book.description }
        </p>
        <div>
          <button
            type="button"
            onClick={handleClick}
          >
            {
              book.included ? 'Remove From Collection' : 'Add To Collection'
            }
          </button>
        </div>
        <span
          role="button"
          tabIndex="0"
          className="back-button"
          onClick={() => router.back()}
          onKeyDown={() => router.back()}
        >
          &#x2b05;
          Back
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  book: state.book,
  username: state.currentUser.data.username,
  token: state.currentUser.data.token,
});

export default connect(mapStateToProps, { fetchAddItem, fetchRemoveItem, fetchBook })(Book);
