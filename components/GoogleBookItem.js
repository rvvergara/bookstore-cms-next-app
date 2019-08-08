import Link from 'next/link';

const LibrarySearchResultItem = ({ book }) => {
  const {
    title, imageLinks, authors, description, subtitle, inLibrary, infoLink,
  } = book;
  return (
    <div className="book-result-item__details">
      <div className="book-result-item__image-wrapper">
        <img src={imageLinks.thumbnail} alt={title} />
      </div>
      <div className="book-result-item__infos">
        <Link
          href={infoLink}
        >
          <a target="blank">
            <h3>
              {title}
              :
              {' '}
              {subtitle}
              {
                inLibrary && (
                  <button
                    type="button"
                  >
                    In Library
                  </button>
                )
            }
            </h3>
          </a>
        </Link>
        <h4>
            By:
          {' '}
          {authors.join(', ')}
          {' '}
        </h4>
        <p>
          {description.substr(0, 500)}
          {' '}
        </p>
      </div>
    </div>
  );
};

export default LibrarySearchResultItem;
