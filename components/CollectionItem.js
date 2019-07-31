const CollectionItem = ({ item }) => {
  const {
    title, category, authors, id,
  } = item;
  return (
    <div className="card">
      <div className="card-body">
        <div className="columns">
          <div className="book-info">
            <h4 className="genre">{category}</h4>
            <h3 className="title">{title}</h3>
            <p>
              by:&nbsp;
              {authors}
            </p>
            <div className="action">
              <button
                className="btn btn-link"
                type="button"
                onClick={() => console.log(`Removed item ${id} from collection`)}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="progress">
            <div>Progress component here</div>
          </div>
          <div className="chapter-info">
            <div>Current Chapter component here</div>
            <div>Progress update component here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionItem;
