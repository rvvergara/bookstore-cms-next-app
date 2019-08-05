import { useState } from 'react';
import { connect } from 'react-redux';
import { switchPageUpdate } from '../redux/actions/collection';
import { fetchUpdatePage } from '../redux/thunks/collection';
import { setErrors } from '../redux/actions/errors';

const PageUpdateForm = ({
  itemForUpdate,
  fetchUpdatePage,
  switchPageUpdate,
  username,
  setErrors,
  error,
}) => {
  const { item_id, current_page } = itemForUpdate;
  const [page, setPage] = useState(current_page);
  const handleChange = (e) => {
    if (e.target.value >= 0) {
      setPage(e.target.value);
    }
  };
  const handlePageUpdate = (e) => {
    e.preventDefault();
    fetchUpdatePage(username, item_id, page)
      .then(() => setErrors(null))
      .then(() => switchPageUpdate());
  };
  return (
    <form>
      {
        error && <div>{error}</div>
      }
      <input
        type="number"
        onChange={handleChange}
        value={page}
      />
      <button
        type="submit"
        onClick={handlePageUpdate}
      >
        Update Page
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  username: state.currentUser.data.username,
  itemForUpdate: state.collection.find(item => item.item_id === state.pageUpdateMode.item_id),
  error: state.errors ? state.errors.errors.current_page : null,
});

export default connect(mapStateToProps, {
  fetchUpdatePage,
  switchPageUpdate,
  setErrors,
})(PageUpdateForm);
