import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';

import { company, actionsBox, scopes, intScopeToString } from '../constants';
import { addCompany, delCompanies } from '../actions/api';
import ConfirmModal from './ConfirmModal';

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
    <Modal show={visibility} onHide={() => toggle(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === actionsBox.CREATE
            ? 'Adding'
            : `Editing ${currentCompany.name}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="py-2">
            <Col>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                placeholder="Company Name"
                value={currentCompany.name}
                onChange={e => setCompanyParam({ name: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="py-2">
            <Col>
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                placeholder="Client Name"
                value={currentCompany.clientName}
                onChange={e => setCompanyParam({ clientName: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Label>Client Type</Form.Label>
              <Form.Control
                placeholder="Client Type"
                value={currentCompany.clientType}
                onChange={e => setCompanyParam({ clientType: e.target.value })}
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
        <Button onClick={() => toggle(false)} variant="danger">
          Cancel
        </Button>
        <Button
          onClick={() => dispatch(addCompany(currentCompany))}
          variant="success"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default AddEditDelCompany;

AddEditDelCompany.propTypes = {
  visibility: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  params: PropTypes.oneOfType([PropTypes.object])
};

AddEditDelCompany.defaultProps = {
  params: {}
};
