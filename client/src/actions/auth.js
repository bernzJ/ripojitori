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
    const { data } = await axios.post('auth/login', user);
    if (data.user) {
      dispatch(setUser(data.user));
    } else {
      dispatch(setMessage(data.message));
    }
  } catch ({ message }) {
    dispatch(setMessage(message));
  }
};

const logout = () => ({
  type: TYPES.SET_USER,
  payload: {}
});

export { TYPES, login, logout, setUser };
