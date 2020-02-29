import axios from 'axios';

const TYPES = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER'
};

const login = user => async (
  dispatch,
  getState
) => {
  try {
    const response = await axios.post("auth/login", user);
    dispatch({
      type: TYPES.LOGIN_USER,
      payload: { user: response.data }
    });
  } catch (error) {
    dispatch({
      type: TYPES.LOGIN_USER,
      payload: { error: error }
    });
  }
};

const logout = () => ({
  type: TYPES.SET_USER,
  payload: {}
});


export { TYPES, login, logout };
