import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  GET_OMS: 'GET_OMS'
};

const initialState = {
  OMS: []
};

const OMSReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_OMS:
      return {
        ...state,
        OMS: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, OMSReducer };
