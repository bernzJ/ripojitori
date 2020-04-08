import { TYPES } from '../actions/api';
import { TYPES as AUTH_TYPES } from '../actions/auth';

const initialState = {
  filter: '',
  companies: [],
  loading: true
};

const apiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_FILTER:
      return { ...state, filter: payload };
    case TYPES.IS_LOADING:
      return { ...state, loading: payload };
    case TYPES.GET_COMPANIES:
      return {
        ...state,
        loading: false,
        companies: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default apiReducer;
