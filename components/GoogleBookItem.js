import Link from 'next/link';
import GoogleBookItemActions from './GoogleBookItemActions';

const LibrarySearchResultItem = ({ book }) => {
  const {
    title, imageLinks, authors, description, subtitle, inLibrary, infoLink,
  } = book;
  return (
    <div className="result-item">
      <div className="result-item__image-wrapper">
        <img src={imageLinks.thumbnail} alt={title} />
      </div>
      <div className="book-result-item__infos">
        <Link
          href={infoLink}
        >
          <a target="blank">
            <h3 className="title">
              {title}
              :
              {' '}
              {subtitle}
              {
                inLibrary && (
                  <button
                    type="button"
                    className="included"
                  >
                    In Library
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
            {authors.join(', ')}
            {' '}
          </small>
        </p>
        <p className="result-item__description">
          {description.substr(0, 500)}
          {' '}
        </p>
        <GoogleBookItemActions book={book} />
      </div>
    </div>
  );
};

export default LibrarySearchResultItem;
