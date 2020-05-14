/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import AdminTable from './AdminTable';
import Loading from './Loading';
import FlashMessage from './FlashMessage';
import { useApi } from '../actions/useApi';
import { api } from '../constants';
import { logout } from '../actions/auth';
import { setUsers } from '../actions/admin';

const MainContainer = styled(Container)`
  &&& {
    height: calc(97vh - 122px);
  }
`;

const Admin = props => {
  const { users, token } = useSelector(
    state => ({
      users: state.adminReducer.users,
      token: state.authReducer.user.token
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const [{ data, isLoading, isError }, doFetch] = useApi(api.admin.get, {
    'x-auth-token': token
  });
  useEffect(() => {
    if (!isLoading && !isError && data.users) {
      dispatch(setUsers(data.users));
    }
  }, [isLoading, isError, data]);

  if (isError && data && data.invalidateSesssion) {
    doFetch({ initialUrl: api.auth.logout });
    dispatch(logout());
  }

  if (isLoading || users.length === 0) {
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
  return (
    <MainContainer fluid>
      <Row className="p-5 justify-content-center">
        <FlashMessage />
      </Row>
      <Row className="px-5">
        <AdminTable items={users} />
      </Row>
    </MainContainer>
  );
};

export default Admin;
