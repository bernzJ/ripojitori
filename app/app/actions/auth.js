import axios from 'axios';

import { setMessage } from './messages';

const TYPES = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER'
};

const setUser = payload => ({
  type: TYPES.LOGIN_USER,
  payload
});

const login = user => async dispatch => {
  try {
    const { data } = await axios.post('http://localhost:5000/auth/login', user);
    if (data.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(setMessage(data));
    }
  } catch ({ message }) {
    dispatch(setMessage(message));
  }
};

const jwtLogin = token => async dispatch => {
  try {
    const { data } = await axios.post('http://localhost:5000/auth/jwt-login', {
      'x-auth-token': token
    });
    if (data.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(setMessage(data));
    }
  } catch ({ message }) {
    dispatch(setMessage(message));
  }
};

const logout = () => ({
  type: TYPES.LOGOUT_USER
});

const apiLogout = () => async dispatch => {
  try {
    await axios.post('http://localhost:5000/auth/logout');
    dispatch(logout());
  } catch ({ message }) {
    dispatch(setMessage(message));
  }
};

export { TYPES, login, jwtLogin, logout, setUser, apiLogout };
