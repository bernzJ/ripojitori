import { TYPES } from '../actions/countries';
import { TYPES as AUTH_TYPES } from '../actions/auth';

const initialState = {
  countries: [],
  loading: true
};

const countriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.IS_LOADING:
      return { ...state, loading: payload };
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

export default countriesReducer;
