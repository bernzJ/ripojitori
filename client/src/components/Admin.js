/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Alert, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import AdminTable from './AdminTable';
import Loading from './Loading';
import AdminSelector from '../selectors/admin';
import { getUsers } from '../actions/admin';
import { resetMessage } from '../actions/messages';

const makeGetAllUsers = () => AdminSelector;
export const AllUsersItems = () => {
  const getAllUsers = React.useMemo(makeGetAllUsers, []);
  const allUsers = useSelector(state => getAllUsers(state));
  return allUsers;
};

const Admin = props => {
  const {
    adminReducer: { loading },
    messagesReducer: { messages }
  } = useSelector(({ authReducer, adminReducer, messagesReducer }) => ({
    authReducer,
    adminReducer,
    messagesReducer
  }));
  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch();
  const items = AllUsersItems();

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, getUsers]);

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
      <Row>
        <AdminTable items={items} />
      </Row>
    </Container>
  );
};

export default Admin;
