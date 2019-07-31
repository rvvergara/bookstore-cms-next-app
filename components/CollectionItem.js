import { connect } from 'react-redux';
import Progress from './Progress';
import CurrentPage from './CurrentPage';

const CollectionItem = ({ item, currentUser }) => {
  const {
    title, category, authors, id, owner_id, current_page, page_count,
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
              {
                currentUser.data.id === owner_id && (
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => console.log(`Removed item ${id} from collection`)}
                >
                Remove
                </button>
                )
            }
            </div>
          </div>
          <div className="progress">
            <Progress
              currentPage={Number(current_page)}
              pages={Number(page_count)}
            />
          </div>
          <div className="chapter-info">
            <CurrentPage currentPage={String(current_page)} />
            <div>Progress update component here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(CollectionItem);
