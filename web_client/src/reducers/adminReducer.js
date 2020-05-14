import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  GET_USERS: 'GET_USERS'
};

const initialState = {
  users: []
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_USERS:
      return {
        ...state,
        users: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, adminReducer };
