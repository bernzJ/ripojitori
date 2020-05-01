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

const setLoading = payload => ({
  type: TYPES.IS_LOADING,
  payload
});

const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(`${endpoints.DEV}/admin/users`, {
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
  } finally {
    dispatch(setLoading(false));
  }
};

const delUsers = users => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();

    const { data } = await axios.post(`${endpoints.DEV}/admin/users/del`, {
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
  } finally {
    dispatch(setLoading(false));
  }
};

const addUser = newUser => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const {
      authReducer: {
        user: { token }
      }
    } = getState();
    const { data } = await axios.post(`${endpoints.DEV}/admin/users/create`, {
      'x-auth-token': token,
      user: newUser
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
  } finally {
    dispatch(setLoading(false));
  }
};

export { TYPES, getUsers, addUser, delUsers, setUsers };
