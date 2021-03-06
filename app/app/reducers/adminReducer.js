import { TYPES } from '../actions/admin';
import { TYPES as AUTH_TYPES } from '../actions/auth';

const initialState = {
  users: [],
  loading: true
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.IS_LOADING:
      return { ...state, loading: payload };
    case TYPES.GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default adminReducer;
