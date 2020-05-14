import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  GET_STATES: 'GET_STATES'
};

const initialState = {
  states: []
};

const statesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_STATES:
      return {
        ...state,
        states: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, statesReducer };
