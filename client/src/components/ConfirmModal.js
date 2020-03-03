import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ModalComponent = ({ title, message, handleResponse }) => {
  const [show, setShow] = React.useState(true);

  const handleClick = confirmed => {
    setShow(!show);
    handleResponse(confirmed);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
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
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleResponse: PropTypes.func.isRequired
};
