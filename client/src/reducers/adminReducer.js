import { TYPES } from '../actions/adminReducer';

const initialState = {
  users: {},
  error: null
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.AUTH_MESSAGE:
      return {
        ...state,
        error: payload
      };
    case TYPES.GET_USERS:
      return {
        ...state,
        users: payload
      };
    default:
      return state;
  }
};

export default adminReducer;