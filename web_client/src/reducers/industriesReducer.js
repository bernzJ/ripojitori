import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  GET_INDUSTRIES: 'GET_INDUSTRIES'
};

const initialState = {
  industries: []
};

const industriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_INDUSTRIES:
      return {
        ...state,
        industries: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, industriesReducer };
