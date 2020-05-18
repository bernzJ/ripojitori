import { TYPES as AUTH_TYPES } from './authReducer';
import { upsert } from '../constants';

const TYPES = {
  ADD_CUSTOMER: 'ADD_CUSTOMER',
  GET_CUSTOMERS: 'GET_CUSTOMERS',
  GET_CURRENT: 'GET_CURRENT',
  SET_CURRENT_BY_ID: 'SET_CURRENT_BY_ID'
};

const initialState = {
  customers: [],
  current: null
};

const customersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.ADD_CUSTOMER: {
      const { customers } = state;
      return {
        ...state,
        customers: upsert(customers, payload)
      };
    }
    case TYPES.SET_CURRENT_BY_ID: {
      const { customers } = state;
      return { ...state, current: customers.find(c => c.Id === payload) };
    }
    case TYPES.GET_CURRENT:
      return { ...state, current: payload };
    case TYPES.GET_CUSTOMERS: {
      // const { current } = state;
      return {
        ...state,
        customers: payload
        // current: current ? payload.find(c => c.Id === current.Id) : current
      };
    }
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, customersReducer };
