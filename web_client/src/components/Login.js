/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Alert, Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { login } from '../actions/auth';
import { setMessage } from '../actions/messages';
import { routes } from '../constants';

import LoginFields from './LoginFields';

const renderError = (...errors) =>
  errors.map((error, i) =>
    error ? (
      <Alert key={i} className="w-100 my-2" variant="danger">
        <Alert.Heading>Messages</Alert.Heading>
        <p>{error}</p>
      </Alert>
    ) : null
  );
const Login = props => {
  const {
    authReducer: { isAuthenticated },
    messagesReducer: { messages }
  } = useSelector(({ authReducer, messagesReducer }) => ({
    authReducer,
    messagesReducer
  }));
  const dispatch = useDispatch();
  if (isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: routes.DASHBOARD,
          state: {
            from: props.location
          }
        }}
      />
    );
  }

  const handleSubmit = fields => {
    const { email, password } = fields;
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      dispatch(setMessage({ message: 'Invalid email.' }));
      return;
    }
    if (password.length < 5) {
      dispatch(setMessage({ message: 'Invalid password.' }));
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <Row>
        {renderError(...messages)}
        <MainContainer>
          <LoginFields handleSubmit={handleSubmit} />
        </MainContainer>
      </Row>
    </Container>
  );
};

export default Login;

const MainContainer = styled.div`
  & {
    padding: 15px;
    width: 100%;
    margin: 5%;
    border: 1px solid #ddd;
  }
`;