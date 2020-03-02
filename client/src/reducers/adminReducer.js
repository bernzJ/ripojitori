import { TYPES } from '../actions/admin';

const initialState = {
  users: [],
  error: null,
  loading: false
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.IS_LOADING:
      return { ...state, loading: true };
    case TYPES.AUTH_MESSAGE:
      return {
        ...state,
        error: payload
      };
    case TYPES.GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload
      };
    default:
      return state;
  }
};

export default adminReducer;
