import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getUsers } from '../actions/adminReducer';

const Admin = props => {
  const { user: { token }, adminReducer: admin } =
    useSelector(({ authReducer: { user }, adminReducer }) => ({ adminReducer, user }));
  console.log(token, admin.users, admin.error);
  const dispatch = useDispatch();
  const buttonClick = React.useCallback(() => dispatch(getUsers(token)),
    [dispatch, getUsers, token]);
  return (
    <div>
      <Button onClick={buttonClick} />
      <span>le Admin Dashboard</span>
    </div>
  );
};

export default Admin;