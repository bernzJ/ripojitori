import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const LoginFields = props => {
  const { handleSubmit } = props;
  const [fields, setState] = React.useState({
    email: '',
    password: ''
  });
  const submitPressed = React.useCallback(() => handleSubmit(fields), [handleSubmit, fields]);
  return (
    <Form className="w-100">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={fields.email}
          onChange={e => setState({
            ...fields,
            email: e.target.value
          })}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We&apos;ll share your email with everyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={fields.password}
          onChange={e => setState({
            ...fields,
            password: e.target.value
          })}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button onClick={submitPressed} variant="primary">
        Submit
      </Button>
    </Form>
  )
};

export default LoginFields;

LoginFields.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};