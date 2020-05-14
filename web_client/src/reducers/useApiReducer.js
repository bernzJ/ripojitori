import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE'
};

const initialState = {
  isLoading: false,
  isError: false,
  data: {}
};

const useApiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case TYPES.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    case TYPES.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};
export { TYPES, initialState, useApiReducer };
