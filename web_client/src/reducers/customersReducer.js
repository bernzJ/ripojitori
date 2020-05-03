import { TYPES } from '../actions/customers';
import { TYPES as AUTH_TYPES } from '../actions/auth';

const initialState = {
  customers: [],
  current: null,
  loading: true
};

const customersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.IS_LOADING:
      return { ...state, loading: payload };
    case TYPES.GET_CURRENT:
      return { ...state, current: payload };
    case TYPES.GET_CUSTOMERS:
      return {
        ...state,
        loading: false,
        customers: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default customersReducer;
