import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  GET_CUSTOMERS: 'GET_CUSTOMERS',
  GET_CURRENT: 'GET_CURRENT'
};

const initialState = {
  customers: [],
  current: null
};

const customersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_CURRENT:
      return { ...state, current: payload };
    case TYPES.GET_CUSTOMERS: {
      const { current } = state;
      return {
        ...state,
        customers: payload,
        current: current ? payload.find(c => c.Id === current.Id) : current
      };
    }
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, customersReducer };
