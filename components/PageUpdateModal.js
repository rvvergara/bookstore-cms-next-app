import Modal from 'react-modal';
import { connect } from 'react-redux';
import { switchPageUpdate } from '../redux/actions/collection';
import PageUpdateForm from './PageUpdateForm';

const PageUpdateModal = ({
  itemForUpdate,
  isUpdateMode,
  switchPageUpdate,
}) => (
  <Modal
    isOpen={isUpdateMode}
    ariaHideApp={false}
    closeTimeoutMS={200}
    onRequestClose={() => switchPageUpdate()}
  >
    <h3>{itemForUpdate.title}</h3>
    <PageUpdateForm />
  </Modal>
);

const mapStateToProps = state => ({
  itemForUpdate: state.collection.find(item => item.item_id === state.pageUpdateMode.item_id),
  isUpdateMode: state.pageUpdateMode.on,
});

export default connect(mapStateToProps, { switchPageUpdate })(PageUpdateModal);
