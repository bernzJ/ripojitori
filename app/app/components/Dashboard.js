/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Alert, Container, Form, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import DashboardTable from './DashboardTable';
import Loading from './Loading';
import getAllCompanies from '../selectors/companies';
import { getCompanies, setFilter } from '../actions/api';
import { resetMessage } from '../actions/messages';
import { saveToken } from '../actions/alias/token';

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
    messagesReducer: { messages },
    tokenReducer: { saved }
  } = useSelector(
    ({ authReducer, apiReducer, messagesReducer, tokenReducer }) => ({
      authReducer,
      apiReducer,
      messagesReducer,
      tokenReducer
    })
  );

  const [show, setShow] = React.useState(false);
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

  if (messages.length > 0 && !show) {
    setShow(true);
  }

  return (
    <Container className="py-3">
      <Row>
        <Alert
          className="w-100"
          show={show}
          variant="danger"
          onClose={() => {
            dispatch(resetMessage());
            setShow(false);
          }}
          dismissible
        >
          <Alert.Heading>Messages</Alert.Heading>
          {messages.map((message, i) => (
            <p key={i}>{message}</p>
          ))}
        </Alert>
      </Row>
      <Row className="justify-content-end">
        <Form>
          <Form.Control
            placeholder="Search"
            value={filter}
            onChange={e => dispatch(setFilter(e.target.value))}
          />
        </Form>
      </Row>
      <Row>
        <DashboardTable items={items} />
      </Row>
    </Container>
  );
};

export default Dashboard;
