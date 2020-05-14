import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  GET_TIMEZONES: 'GET_TIMEZONES'
};

const initialState = {
  timezones: []
};

const timezonesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_TIMEZONES:
      return {
        ...state,
        timezones: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, timezonesReducer };
