import axios from 'axios';
import { addError, addSuccess } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { apiLogout } from './auth';

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
    const { data } = await axios.post(`${endpoints.PROD}/admin/users`, {
      'x-auth-token': token
    });
    if (data.users) {
      dispatch(setUsers(data.users));
    } else if (data.message) {
      addError({ text: data.message, data: 'admin.js getUsers data.users' });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'admin.js getUsers catch' });
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

    const { data } = await axios.post(`${endpoints.PROD}/admin/users/del`, {
      'x-auth-token': token,
      users
    });
    if (data.message) {
      addError({ text: data.message, data: 'admin.js delUsers data.message' });
    } else {
      dispatch(getUsers());
      addSuccess({ text: `Sent query: ${JSON.stringify(data)}.` });
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'admin.js delUsers catch' });
  }
};

// @NOTE: this upsert, so if _id is not here, its created.
const addUser = ({
  _id,
  email,
  password,
  firstName,
  lastName,
  scope
}) => async (dispatch, getState) => {
  try {
    dispatch({ type: TYPES.IS_LOADING, payload: true });
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(`${endpoints.PROD}/admin/users/create`, {
      'x-auth-token': token,
      user: { _id, email, password, firstName, lastName, scope }
    });
    if (data.message) {
      addError({ text: data.message, data: 'admin.js addUser data.message' });
    } else {
      addSuccess({ text: 'Saved changes.' });
      dispatch(getUsers());
    }
  } catch ({ message }) {
    dispatch(apiLogout());
    addError({ text: message, data: 'admin.js addUser catch' });
  }
};

export { TYPES, getUsers, addUser, delUsers, setUsers };
