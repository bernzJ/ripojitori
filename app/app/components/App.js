import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import { setTest } from '../actions/test';
import { saveTest } from '../actions/alias/test';

const App = () => {
  const { test, loading } = useSelector(({ testReducer }) => testReducer);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Spinner animation="grow" variant="dark" />
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row className="justify-content-center">
        <Form>
          <Row className="py-2">
            <Col>
              <Form.Label>Test value</Form.Label>
              <Form.Control
                placeholder="Bleh .."
                value={test}
                onChange={e => dispatch(setTest(e.target.value))}
              />
            </Col>
            <Col>
              <Button variant="primary" onClick={() => dispatch(saveTest())}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default App;
