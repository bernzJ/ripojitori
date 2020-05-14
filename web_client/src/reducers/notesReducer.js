import { TYPES as AUTH_TYPES } from './authReducer';

const TYPES = {
  GET_NOTES: 'GET_NOTES'
};

const initialState = {
  notes: []
};

const notesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.GET_NOTES:
      return {
        ...state,
        notes: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export { TYPES, notesReducer };
