import { TYPES } from '../actions/authReducer';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.AUTH_MESSAGE:
      return {
        ...state,
        error: payload
      };
    case TYPES.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    case TYPES.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;