/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import { Container, Form, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import DashboardTable from './DashboardTable';
import Loading from './Loading';
import FlashMessage from './FlashMessage';
import getAllCustomers from '../selectors/customers';
import { getCustomers, setFilter } from '../actions/customers';

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
    height: calc(100vh - 250px);
  }
`;

const makeGetAllCustomers = () => getAllCustomers;
export const AllCustomersItems = () => {
  const allCachedCustomers = React.useMemo(makeGetAllCustomers, []);
  const allCustomers = useSelector(state => allCachedCustomers(state));
  return allCustomers;
};

const Dashboard = props => {
  const {
    customersReducer: { loading, filter }
  } = useSelector(({ customersReducer }) => ({
    customersReducer
  }));

  const dispatch = useDispatch();
  const items = AllCustomersItems();

  React.useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch, getCustomers]);

  if (loading) {
    return <Loading />;
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
            value={filter}
            onChange={e => dispatch(setFilter(e.target.value))}
          />
        </FormContainer>
      </Row>
      <AutoRow className="px-5">
        <DashboardTable items={items} />
      </AutoRow>
    </MainContainer>
  );
};

export default Dashboard;
