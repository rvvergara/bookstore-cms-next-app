const LibrarySearchResultItem = ({ book }) => {
  const {
    title, thumbnail, book_id, authors, description, subtitle,
  } = book;
  return (
    <div className="book-result-item__details">
      <div className="book-result-item__image-wrapper">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="book-result-item__infos">
        <h3>
          {title}
          :
          {' '}
          {subtitle}
        </h3>
        <h4>
            By:
          {' '}
          {authors}
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
