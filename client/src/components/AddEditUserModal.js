import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Modal } from 'react-bootstrap';

import { user } from '../constants';

const AddEditUserModal = ({ show, hide, mode, selectedUser }) => {
  const initialState = {
    message: null
  };
  const [state, setState] = React.useState(initialState);
  const handleShow = () => {
    if (!selectedUser._id) {
      setState({
        ...state,
        message: 'Please select one user to edit, dumbass.'
      });
    }
  };
  console.log('MODAL rendered');
  return (
    <Modal show={show} onHide={() => hide(false)} onShow={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Editing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert show={state.message !== null} variant="danger">
          {state.message}
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success">Cancel</Button>
        <Button variant="danger">Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddEditUserModal;

AddEditUserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape(user),
  mode: PropTypes.number
};

AddEditUserModal.defaultProps = {
  mode: 0,
  selectedUser: {}
};
