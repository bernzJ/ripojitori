import { TYPES } from '../actions/timezones';
import { TYPES as AUTH_TYPES } from '../actions/auth';

const initialState = {
  timezones: [],
  loading: true
};

const timezonesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.IS_LOADING:
      return { ...state, loading: payload };
    case TYPES.GET_TIMEZONES:
      return {
        ...state,
        loading: false,
        timezones: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default timezonesReducer;
