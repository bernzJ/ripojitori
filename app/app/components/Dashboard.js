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
import getAllCompanies from '../selectors/companies';
import { getCompanies, setFilter } from '../actions/api';
import { saveToken } from '../actions/alias/token';

const MainContainer = styled(Container)`
  &&& {
    height: calc(97vh - 122px);
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

const makeGetAllCompanies = () => getAllCompanies;
export const AllCompaniesItems = () => {
  const getAllUsers = React.useMemo(makeGetAllCompanies, []);
  const allUsers = useSelector(state => getAllUsers(state));
  return allUsers;
};

const Dashboard = props => {
  const {
    authReducer: {
      user: { token }
    },
    apiReducer: { loading, filter },
    tokenReducer: { saved }
  } = useSelector(({ authReducer, apiReducer, tokenReducer }) => ({
    authReducer,
    apiReducer,
    tokenReducer
  }));

  const dispatch = useDispatch();
  const items = AllCompaniesItems();

  React.useEffect(() => {
    dispatch(getCompanies());
    if (!saved) {
      dispatch(saveToken(token));
    }
  }, [dispatch, getCompanies, saveToken, token, saved]);

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
      <Row className="px-5">
        <DashboardTable items={items} />
      </Row>
    </MainContainer>
  );
};

export default Dashboard;
