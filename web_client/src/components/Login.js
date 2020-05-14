/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { addError } from 'redux-flash-messages';

import { setUser } from '../actions/auth';
import { api, routes } from '../constants';
import { useApi } from '../actions/useApi';

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
  const { user, isAuthenticated } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  const [{ data, isLoading, isError }, doFetch] = useApi(api.auth.jwtLogin, {
    'x-auth-token': user ? user.token : null
  });

  useEffect(() => {
    if (!isLoading && !isError && data.user) {
      dispatch(setUser(data.user));
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return (
      <Container>
        <Row className="p-5 justify-content-center">
          <FlashMessage />
        </Row>
        <Row className="pt-5">
          <Loading />
        </Row>
      </Container>
    );
  }
  if (isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: routes.CLIENTS,
          state: {
            from: props.location
          }
        }}
      />
    );
  }

  const handleSubmit = fields => {
    const { Email, Password } = fields;
    const re = /\S+@\S+\.\S+/;
    if (!re.test(Email)) {
      addError({
        text: 'Invalid email.',
        data: 'Login.js handleSubmit !re.test(email)'
      });
      return;
    }
    if (Password.length < 5) {
      addError({
        text: 'Invalid password.',
        data: 'Login.js handleSubmit password.length < 5'
      });
      return;
    }
    doFetch({
      initialUrl: api.auth.login,
      body: { Email, Password }
    });
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
