import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import VirtualizedList from './VirtualizedTable';
import AdminSelector from '../selectors/admin';
import { getUsers } from '../actions/admin';

const makeGetAllUsers = () => AdminSelector();
export const AllUsersItems = () => {
  const getAllUsers = React.useMemo(makeGetAllUsers, []);
  const allUsers = useSelector(state => getAllUsers(state));
  return allUsers;
};

const Admin = props => {
  const {
    user: { token },
    adminReducer: admin
  } = useSelector(({ authReducer: { user }, adminReducer }) => ({
    adminReducer,
    user
  }));

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch, getUsers, token]);
  return (
    <div>
      <VirtualizedList items={admin.users} />
    </div>
  );
};

export default Admin;
