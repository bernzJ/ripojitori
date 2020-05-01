/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import AdminTable from './AdminTable';
import Loading from './Loading';
import FlashMessage from './FlashMessage';
import { getUsers } from '../actions/admin';

const MainContainer = styled(Container)`
  &&& {
    height: calc(97vh - 122px);
  }
`;

const Admin = props => {
  const {
    adminReducer: { loading, users }
  } = useSelector(({ authReducer, adminReducer }) => ({
    authReducer,
    adminReducer
  }));
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
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
