import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  GET_COUNTRIES: 'GET_COUNTRIES'
};

const initialState = {
  countries: []
};

const countriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_COUNTRIES:
      return {
        ...state,
        countries: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, countriesReducer };
