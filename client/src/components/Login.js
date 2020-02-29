import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Alert, Button, Container, Form, Row } from 'react-bootstrap';

import { login } from '../actions/authReducer';

const renderError = (...errors) => errors.map((error, i) => error ? <Alert key={i} className="w-100 my-2" variant="danger">{error}</Alert> : null);

const Login = props => {
  const [form, setState] = React.useState({
    email: '',
    password: '',
    error: null
  });
  const { location: { state: { reError } = { reError: null } } } = props;
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    () => {
      const { email, password } = form;
      const re = /\S+@\S+\.\S+/;
      if (!re.test(email)) {
        return setState({ ...form, error: 'Invalid email.' });
      }
      if (password.length < 5) {
        return setState({ ...form, error: 'Invalid password.' });
      }
      dispatch(login({ email, password }));
    },
    [form, setState, dispatch, login]
  );

  return (
    <Container>
      <Row>
        {renderError(form.error, reError)}
        <MainContainer>
          <Form className="w-100">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control value={form.email} onChange={e => setState({
                ...form,
                email: e.target.value
              })}
                type="email"
                placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll share your email with everyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={form.password} onChange={e => setState({
                ...form,
                password: e.target.value
              })}
                type="password"
                placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button onClick={handleSubmit} variant="primary">
              Submit
            </Button>
          </Form>
        </MainContainer>
      </Row>
    </Container>
  );
};

export default Login;

const MainContainer = styled.div`
&{
  padding: 15px;
  width: 100%;
  margin: 5%;
  border: 1px solid #ddd;
}
`;