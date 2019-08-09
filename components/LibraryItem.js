import Link from 'next/link';
import LibraryItemActions from './LibraryItemActions';

const LibrarySearchResultItem = ({ book }) => {
  const {
    title, thumbnail, book_id, authors, description, subtitle, included,
  } = book;
  return (
    <div className="result-item">
      <div className="result-item__image-wrapper">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="book-result-item__infos">
        <Link
          href="/library/[book]"
          as={`/library/${book_id}`}
        >
          <a>
            <h3 className="title">
              {title}
              :
              {' '}
              {subtitle}
              {
                included && (
                  <button
                    type="button"
                    className="included"
                  >
                  In collection
                  </button>
                )
            }
            </h3>
          </a>
        </Link>
        <p className="result-item__authors">
          <small>
              By:
            {' '}
            {authors}
            {' '}
          </small>
        </p>
        <p className="result-item__description">
          {description.substr(0, 500)}
          {' '}
        </p>
        <LibraryItemActions book={book} />
      </div>
    </div>
  );
};

export default LibrarySearchResultItem;
