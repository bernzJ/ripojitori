import React from 'react';
import { Alert, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import VirtualizedList from './VirtualizedTable';
import Loading from './Loading';
import AdminSelector from '../selectors/admin';
import { getUsers } from '../actions/admin';

const makeGetAllUsers = () => AdminSelector;
export const AllUsersItems = () => {
  const getAllUsers = React.useMemo(makeGetAllUsers, []);
  const allUsers = useSelector(state => getAllUsers(state));
  return allUsers;
};

const Admin = props => {
  const {
    authReducer: {
      user: { token }
    },
    adminReducer: { loading },
    messagesReducer: { messages }
  } = useSelector(({ authReducer, adminReducer, messagesReducer }) => ({
    authReducer,
    adminReducer,
    messagesReducer
  }));

  const [show, setShow] = React.useState(messages.length > 0);
  const dispatch = useDispatch();
  const items = AllUsersItems();

  React.useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch, getUsers, token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container className="py-3">
      <Row>
        <Alert
          className="w-100"
          show={show}
          variant="danger"
          onClose={() => {
            setShow(false);
          }}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{messages.map(message => message)}</p>
        </Alert>
      </Row>
      <Row>
        <VirtualizedList items={items} />
      </Row>
    </Container>
  );
};

export default Admin;
