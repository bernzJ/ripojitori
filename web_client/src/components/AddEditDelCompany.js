import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';

import { company, actionsBox, scopes, intScopeToString } from '../constants';
import { addCompany, delCompanies } from '../actions/api';
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

const AddEditDelCompany = ({ visibility, toggle, mode, params }) => {
  const initialState = {
    company: params.selected ? { ...params.selected } : company
  };
  const [state, setState] = React.useState(initialState);
  const dispatch = useDispatch();

  if (mode === actionsBox.DELETE) {
    const { selected, title, message } = params;
    const handleResponse = confirm => {
      if (confirm) {
        dispatch(delCompanies(selected.map(u => u._id)));
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

  const { company: currentCompany } = state;
  const setCompanyParam = kv =>
    setState({ ...state, company: { ...currentCompany, ...kv } });
  return (
    <ModalWrapper show={visibility} onHide={() => toggle(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === actionsBox.CREATE
            ? 'Adding'
            : `Editing ${currentCompany.clientName}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="py-2">
            <Col>
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                placeholder="Client Name"
                value={currentCompany.clientName}
                onChange={e => setCompanyParam({ clientName: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              <Form.Label>Project Resource</Form.Label>
              <Form.Control
                placeholder="Project Resource"
                value={currentCompany.projectResource}
                onChange={e =>
                  setCompanyParam({ projectResource: e.target.value })
                }
              />
            </Col>
            <Col>
              <Form.Label>Segment</Form.Label>
              <Form.Control
                placeholder="Segment"
                value={currentCompany.segment}
                onChange={e => setCompanyParam({ segment: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              <Form.Label>Category</Form.Label>
              <Form.Control
                placeholder="Category"
                value={currentCompany.category}
                onChange={e => setCompanyParam({ category: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Label>Status</Form.Label>
              <Form.Control
                placeholder="Status"
                value={currentCompany.status}
                onChange={e => setCompanyParam({ status: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              <Form.Label>Hours</Form.Label>
              <Form.Control
                placeholder="Hours"
                value={currentCompany.hours}
                onChange={e => setCompanyParam({ hours: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                placeholder="Start"
                value={currentCompany.start}
                onChange={e => setCompanyParam({ start: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                placeholder="End"
                value={currentCompany.end}
                onChange={e => setCompanyParam({ end: e.target.value })}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Permission</Form.Label>
              <Dropdown onSelect={scope => setCompanyParam({ scope })}>
                <Dropdown.Toggle variant="Secondary" id="dropdown-scopes">
                  {intScopeToString(currentCompany.scope)}
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
        <SaveButton onClick={() => dispatch(addCompany(currentCompany))}>
          Save
        </SaveButton>
      </Modal.Footer>
    </ModalWrapper>
  );
};

AddEditDelCompany.propTypes = {
  visibility: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  params: PropTypes.oneOfType([PropTypes.object])
};

AddEditDelCompany.defaultProps = {
  params: {}
};

export default AddEditDelCompany;
