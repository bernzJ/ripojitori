/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Form, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import ClientsDetailsTable from './ClientsDetailsTable';
import Loading from './Loading';
import FlashMessage from './FlashMessage';
import { api } from '../constants';
import { useApi } from '../actions/useApi';
import { logout } from '../actions/auth';
import { setCustomers } from '../actions/customers';

const MainContainer = styled(Container)`
  &&& {
    height: calc(100vh - 62px);
  }
`;
const FormContainer = styled(Form)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border-radius: 25px;
    border: #efefef 1px solid;
    background-color: #fff;
  }
  &&&:hover .search {
    color: #4898cf;
  }
  &&& .round {
    color: #a2a1a4;
    transition: all 0.2s linear;
    border: none;
    box-shadow: none;
  }
  &&& .round::placeholder {
    color: #757575;
  }
  &&& .round:focus,
  &&& .round:hover {
    outline: none;
  }
  &&& .search {
    display: inline-block;
    transition: color 0.2s linear;
  }
`;
const AutoRow = styled(Row)`
  &&& {
    height: calc(100vh - 525px);
  }
`;

const ClientsDetails = ({ location: { Id } }) => {
  const { token, customers } = useSelector(state => ({
    token: state.authReducer.user.token,
    customers: state.customersReducer.customers
  }));
  const dispatch = useDispatch();
  const [items, setItems] = React.useState([]);

  // @TODO: move this accordingly
  const [{ data, isLoading, isError }, doFetch] = useApi(api.customers.get, {
    'x-auth-token': token
  });

  useEffect(() => {
    if (customers.length > 0) {
      setItems(customers);
    }
  }, [customers]);

  useEffect(() => {
    if (!isLoading && !isError && data.customers) {
      dispatch(setCustomers(data.customers));
    }
  }, [isLoading, isError, data]);
  // @TODO: test this for infinite loops.
  useEffect(() => {
    if (isError && data && data.invalidateSesssion) {
      doFetch({ initialUrl: api.auth.logout });
      dispatch(logout());
    }
  }, [data.invalidateSesssion, isError, data, doFetch]);

  const filterData = filter => {
    setItems(
      items.filter(customer =>
        Object.keys(customer).find(
          key =>
            customer[key]
              .toString()
              .toLowerCase()
              .indexOf(filter) > -1
        )
      )
    );
  };

  if (isLoading || items.length === 0) {
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
      <Row className="justify-content-begin px-5">
        <FormContainer>
          <FontAwesomeIcon
            icon={faSearch}
            className="search mx-2"
            color="#757575"
          />
          <Form.Control
            className="round"
            placeholder="Search"
            onChange={e => filterData(e.target.value)}
          />
        </FormContainer>
      </Row>
      <AutoRow className="px-5">
        <ClientsDetailsTable items={items} mapId={Id} />
      </AutoRow>
    </MainContainer>
  );
};

export default ClientsDetails;
