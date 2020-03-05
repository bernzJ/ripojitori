import axios from 'axios';

import { setMessage, setMessageAndInvalidateSession } from './messages';

const TYPES = {
  IS_LOADING: 'IS_LOADING',
  GET_USERS: 'GET_USERS'
};

const setUsers = payload => ({
  type: TYPES.GET_USERS,
  payload
});

const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post('admin/users', { 'x-auth-token': token });
    // @NOTE: uncomment to test invalid/errors.
    // return dispatch(setMessageAndInvalidateSession('Booo ! get out.'));
    if (data.users) {
      dispatch(setUsers(data.users));
    } else {
      dispatch(setMessage(data));
    }
  } catch ({ message }) {
    dispatch(setMessageAndInvalidateSession(message));
  }
};

const delUsers = users => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post('admin/users/del', {
      'x-auth-token': token,
      users
    });
    if (data.message) {
      dispatch(setMessage(data));
    } else {
      dispatch(
        setMessage({
          message: `Sent query, deleted: ${data.result.deletedCount} users.`
        })
      );
      dispatch(getUsers());
    }
  } catch ({ message }) {
    dispatch(setMessageAndInvalidateSession(message));
  }
};

// @NOTE: this upsert, so if _id is not here, its created.
const addUser = ({ email, password, firstName, lastName, scope }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post('admin/users/create', {
      'x-auth-token': token,
      user: { email, password, firstName, lastName, scope }
    });
    if (data.message) {
      dispatch(setMessage(data));
    } else {
      dispatch(
        setMessage({
          message: 'Saved changes.'
        })
      );
      dispatch(getUsers());
    }
  } catch ({ message }) {
    dispatch(setMessageAndInvalidateSession(message));
  }
};

export { TYPES, getUsers, addUser, delUsers, setUsers };
