import { TYPES } from '../reducers/authReducer';

const setUser = payload => ({
  type: TYPES.LOGIN_USER,
  payload
});

const logout = () => ({
  type: TYPES.LOGOUT_USER
});

export { logout, setUser };
