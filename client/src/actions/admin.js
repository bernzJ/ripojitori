import axios from 'axios';

import { setMessage, setMessageAndInvalidateSession } from './messages';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_USERS: 'GET_USERS',
  DEL_USERS: 'DEL_USERS'
};

const setUsers = payload => ({
  type: TYPES.GET_USERS,
  payload
});

const getUsers = token => async dispatch => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const { data } = await axios.post('admin/users', { 'x-auth-token': token });
    // @NOTE: uncomment to test invalid/errors.
    // return dispatch(setMessageAndInvalidateSession('Booo ! get out.'));
    if (data.users) {
      dispatch(setUsers(data.users));
    } else {
      dispatch(setMessageAndInvalidateSession(data.message));
    }
  } catch ({ message }) {
    dispatch(setMessageAndInvalidateSession(message));
  }
};

const delUsers = (token, users) => async dispatch => {};

export { TYPES, getUsers, delUsers, setUsers };
