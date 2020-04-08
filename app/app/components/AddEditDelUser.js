import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';

import { user, actionsBox, scopes, intScopeToString } from '../constants';
import { addUser, delUsers } from '../actions/admin';
import ConfirmModal from './ConfirmModal';

const AddEditDelUser = ({ visibility, toggle, mode, params }) => {
  const initialState = {
    user: params.selected ? { ...params.selected, password: '' } : user
  };
  const [state, setState] = React.useState(initialState);
  const dispatch = useDispatch();

  if (mode === actionsBox.DELETE) {
    const { selected, title, message } = params;
    const handleResponse = confirm => {
      if (confirm) {
        dispatch(delUsers(selected.map(u => u._id)));
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

  const { user: currentUser } = state;
  const setUserParam = kv =>
    setState({ ...state, user: { ...currentUser, ...kv } });

  return (
    <ModalWrapper show={visibility} onHide={() => toggle(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === actionsBox.CREATE
            ? 'Adding'
            : `Editing ${currentUser.email}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="py-2">
            <Col>
              <Form.Label>First name</Form.Label>
              <Form.Control
                placeholder="First name"
                value={currentUser.firstName}
                onChange={e => setUserParam({ firstName: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                placeholder="Last name"
                value={currentUser.lastName}
                onChange={e => setUserParam({ lastName: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password"
                value={currentUser.password}
                onChange={e => setUserParam({ password: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Email"
                value={currentUser.email}
                onChange={e => setUserParam({ email: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Label>Permission</Form.Label>
              <Dropdown onSelect={scope => setUserParam({ scope })}>
                <Dropdown.Toggle variant="Secondary" id="dropdown-scopes">
                  {intScopeToString(currentUser.scope)}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Object.keys(scopes).map(scope => (
                    <Dropdown.Item key={scope} eventKey={scopes[scope]}>
                      {scope}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={() => toggle(false)}>Cancel</CancelButton>
        <SaveButton
          onClick={() => dispatch(addUser(currentUser))}
          variant="success"
        >
          Save
        </SaveButton>
      </Modal.Footer>
    </ModalWrapper>
  );
};
export default AddEditDelUser;

AddEditDelUser.propTypes = {
  visibility: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  params: PropTypes.oneOfType([PropTypes.object])
};

AddEditDelUser.defaultProps = {
  params: {}
};

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
