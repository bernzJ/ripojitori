import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ModalWrapper = styled(Modal)`
  &&& .modal-content,
  &&& .modal-header,
  &&& .modal-footer {
    border: none;
    border-radius: 0;
    color: #00355c;
    background-clip: none;
  }
  &&& .modal-header {
    background-color: #4898cf;
    color: #fff;
  }
  &&& .modal-content input {
    border-radius: 0;
  }
  &&& .modal-content .dropdown .dropdown-toggle {
    border: 1px solid #ced4da;
  }
`;
const SaveButton = styled(Button)`
  &&& {
    text-transform: uppercase;
    color: #fff;
    background-color: #4898cf;
    transition: background-color 0.2s linear;
    border: none;
  }
  &&&:hover,
  &&&:focus {
    outline: none;
    box-shadow: none;
    background-color: #5abcff;
  }
`;
const CancelButton = styled(Button)`
  &&& {
    text-transform: uppercase;
    color: #fff;
    background-color: #969696;
    transition: background-color 0.2s linear;
    border: none;
  }
  &&&:hover,
  &&&:focus {
    outline: none;
    box-shadow: none;
    background-color: #c5c5c5;
  }
`;

const ModalComponent = ({ show, hide, title, message, handleResponse }) => {
  const handleClick = confirmed => {
    handleResponse(confirmed);
    hide(false);
  };

  return (
    <ModalWrapper show={show} onHide={() => hide(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={() => handleClick(false)}>Cancel</CancelButton>
        <SaveButton onClick={() => handleClick(true)}>Confirm</SaveButton>
      </Modal.Footer>
    </ModalWrapper>
  );
};

ModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleResponse: PropTypes.func.isRequired
};

export default ModalComponent;
