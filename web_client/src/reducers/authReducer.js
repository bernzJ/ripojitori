import { TYPES } from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: true
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_LOADING:
      return { ...state, loading: payload };
    case TYPES.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    case TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
