import { connect } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Progress from './Progress';
import CurrentPage from './CurrentPage';
import { fetchRemoveItem } from '../redux/thunks/collection';
import PageUpdateBtn from './PageUpdateBtn';

const CollectionItem = ({
  item,
  currentUser,
  fetchRemoveItem,
}) => {
  const {
    title,
    category,
    authors,
    book_id,
    item_id,
    owner_id,
    current_page,
    page_count,
  } = item;
  const router = useRouter();
  return (
    <div className="card">
      <div className="card-body">
        <div className="columns">
          <div className="book-info">
            <h4 className="genre">{category}</h4>
            <Link
              href="/library/[book]"
              as={`/library/${book_id}`}
            >
              <a>
                <h3 className="title">{title}</h3>
              </a>
            </Link>
            <p>
            by:&nbsp;
              {authors}
            </p>
            <div className="action">
              {
              currentUser.data && currentUser.data.id === owner_id && (
              <button
                className="btn btn-link"
                type="button"
                onClick={() => fetchRemoveItem(username, item_id)}
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
            {currentUser.data && (router.query.username === currentUser.data.username || router.pathname === '/') && (
              <div className="progress">
                <PageUpdateBtn item_id={item_id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { fetchRemoveItem })(CollectionItem);
