import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ModalComponent = ({ show, hide, title, message, handleResponse }) => {
  const handleClick = confirmed => {
    handleResponse(confirmed);
    hide();
  };

  return (
    <Modal show={show} onHide={() => hide()}>
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
  );
};
export default ModalComponent;

ModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleResponse: PropTypes.func.isRequired
};
