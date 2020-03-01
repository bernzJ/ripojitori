import axios from 'axios';

const TYPES = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  AUTH_MESSAGE: 'AUTH_MESSAGE'
};

const login = user => async dispatch => {
  try {
    const { data } = await axios.post('auth/login', user);
    if (data.user) {
      dispatch({
        type: TYPES.LOGIN_USER,
        payload: data.user
      });
      return;
    }
    dispatch({
      type: TYPES.AUTH_MESSAGE,
      payload: data.message
    });
    return;
  } catch (error) {
    dispatch({
      type: TYPES.AUTH_MESSAGE,
      payload: error
    });
  }
};

const logout = () => ({
  type: TYPES.SET_USER,
  payload: {}
});

export { TYPES, login, logout };
