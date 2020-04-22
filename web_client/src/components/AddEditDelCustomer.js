import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';

import { customer, actionsBox, scopes, intScopeToString } from '../constants';
import { addCustomer, delCustomers } from '../actions/customers';
import ConfirmModal from './ConfirmModal';

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

const AddEditDelCustomer = ({ visibility, toggle, mode, params }) => {
  const initialState = {
    customer: params.selected ? { ...params.selected } : customer
  };
  const [state, setState] = React.useState(initialState);
  const dispatch = useDispatch();

  if (mode === actionsBox.DELETE) {
    const { selected, title, message } = params;
    const handleResponse = confirm => {
      if (confirm) {
        dispatch(delCustomers(selected.map(u => u._id)));
      }
    };
    return (
      <ConfirmModal
        show={visibility}
        hide={toggle}
        title={title}
        message={message}
        handleResponse={handleResponse}
      />
    );
  }

  const { customer: currentCustomer } = state;
  const setCustomerParam = kv =>
    setState({ ...state, customer: { ...currentCustomer, ...kv } });
  return (
    <ModalWrapper show={visibility} onHide={() => toggle(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === actionsBox.CREATE
            ? 'Adding'
            : `Editing ${currentCustomer['Company Name']}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="py-2">
            <Col>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                placeholder="Company Name"
                value={currentCustomer['Company Name']}
                onChange={e =>
                  setCustomerParam({ 'Company Name': e.target.value })
                }
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={() => toggle(false)}>Cancel</CancelButton>
        <SaveButton onClick={() => dispatch(addCustomer(currentCustomer))}>
          Save
        </SaveButton>
      </Modal.Footer>
    </ModalWrapper>
  );
};

AddEditDelCustomer.propTypes = {
  visibility: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  params: PropTypes.oneOfType([PropTypes.object])
};

AddEditDelCustomer.defaultProps = {
  params: {}
};

export default AddEditDelCustomer;
