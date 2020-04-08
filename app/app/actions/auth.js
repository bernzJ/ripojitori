import axios from 'axios';
import { addError } from 'redux-flash-messages';

import { endpoints } from '../constants';
import { saveToken } from './alias/token';

const TYPES = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  SET_LOADING: 'SET_LOADING'
};

const setUser = payload => ({
  type: TYPES.LOGIN_USER,
  payload
});

const setLoading = payload => ({
  type: TYPES.SET_LOADING,
  payload
});

const login = user => async dispatch => {
  try {
    const { data } = await axios.post(`${endpoints.PROD}/auth/login`, user);
    if (data.user) {
      dispatch(setUser(data.user));
    } else if (data.message) {
      addError({
        text: data.message,
        data: 'auth.js login data.message'
      });
    }
  } catch ({ message }) {
    addError({ text: message, data: 'auth.js login catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const jwtLogin = token => async dispatch => {
  try {
    const { data } = await axios.post(`${endpoints.PROD}/auth/jwt-login`, {
      'x-auth-token': token
    });
    if (data.user) {
      dispatch(setUser(data.user));
    } else if (data.message && typeof data.message === 'string') {
      addError({
        text: data.message,
        data: 'auth.js jwtLogin data.message'
      });
    }
  } catch ({ message }) {
    addError({ text: message, data: 'auth.js jwtLogin catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

const logout = () => ({
  type: TYPES.LOGOUT_USER
});

const apiLogout = () => async dispatch => {
  try {
    await axios.post(`${endpoints.PROD}/auth/logout`);
    dispatch(saveToken(''));
    dispatch(logout());
  } catch ({ message }) {
    addError({ text: message, data: 'auth.js apiLogout catch' });
  } finally {
    dispatch(setLoading(false));
  }
};

export { TYPES, login, jwtLogin, logout, setUser, apiLogout };
