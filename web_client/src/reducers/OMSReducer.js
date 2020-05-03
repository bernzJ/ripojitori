import { TYPES } from '../actions/OMS';
import { TYPES as AUTH_TYPES } from '../actions/auth';

const initialState = {
  OMS: [],
  loading: true
};

const OMSReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.IS_LOADING:
      return { ...state, loading: payload };
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

export default OMSReducer;
