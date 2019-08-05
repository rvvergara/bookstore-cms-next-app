import { connect } from 'react-redux';
import { switchPageUpdate } from '../redux/actions/collection';

const PageUpdateBtn = ({ switchPageUpdate, item_id }) => (
  <button
    className="update-btn update-btn-primary"
    type="button"
    onClick={() => switchPageUpdate(item_id)}
  >
    Update Page
  </button>
);

export default connect(null, { switchPageUpdate })(PageUpdateBtn);
