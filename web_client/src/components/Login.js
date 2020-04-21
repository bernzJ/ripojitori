/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { addError } from 'redux-flash-messages';

import { login, jwtLogin } from '../actions/auth';
import { routes } from '../constants';

import LoginFields from './LoginFields';
import Loading from './Loading';
import FlashMessage from './FlashMessage';

const FirstContainer = styled(Container)`
  &&& {
    padding-top: 85px;
  }
`;
const MainContainer = styled.div`
  & {
    padding: 15px;
    width: 100%;
    margin: 5%;
    border: 1px solid #ddd;
  }
`;

const Login = props => {
  const {
    authReducer: {
      isAuthenticated,
      loading: JWTLoading,
      user: { token }
    }
  } = useSelector(({ authReducer }) => ({
    authReducer
  }));
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (token) {
      dispatch(jwtLogin(token));
    }
  }, [dispatch, jwtLogin, token]);
  if (JWTLoading && !isAuthenticated) {
    return <Loading />;
  }

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
      addError({
        text: 'Invalid email.',
        data: 'Login.js handleSubmit !re.test(email)'
      });
      return;
    }
    if (password.length < 5) {
      addError({
        text: 'Invalid password.',
        data: 'Login.js handleSubmit password.length < 5'
      });
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <FirstContainer>
      <Row className="justify-content-center">
        <FlashMessage />
        <MainContainer>
          <LoginFields handleSubmit={handleSubmit} />
        </MainContainer>
      </Row>
    </FirstContainer>
  );
};

export default Login;
