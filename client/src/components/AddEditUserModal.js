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
    // @TODO: this won't happend, remove.
    if (!selectedUser._id) {
      setState({
        ...state,
        message: 'Please select one user to edit, dumbass.'
      });
    }
  };
  return (
    <Modal show={show} onHide={() => hide(false)} onShow={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 0 ? 'Adding' : 'Editing'}</Modal.Title>
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
// @MODES: 0 = Add, 1= Update
AddEditUserModal.defaultProps = {
  mode: 0,
  selectedUser: {}
};
