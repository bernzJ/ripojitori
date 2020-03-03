import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const AddEditUserModal = ({
  title,
  message,
  mode,
  handleResponse,
  launchButton
}) => {
  const [show, setShow] = React.useState(false);

  const handleClick = confirmed => {
    setShow(!show);
    handleResponse(confirmed);
  };

  return (
    <div>
      <div onClick={() => setShow(true)}>{launchButton}</div>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClick(false)} variant="success">
            Cancel
          </Button>
          <Button onClick={() => handleClick(true)} variant="danger">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddEditUserModal;

AddEditUserModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleResponse: PropTypes.func.isRequired,
  launchButton: PropTypes.node.isRequired,
  mode: PropTypes.number
};

AddEditUserModal.defaultProps = {
  mode: 0
};
