import { TYPES } from '../actions/industries';
import { TYPES as AUTH_TYPES } from '../actions/auth';

const initialState = {
  industries: [],
  loading: true
};

const industriesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.IS_LOADING:
      return { ...state, loading: payload };
    case TYPES.GET_INDUSTRIES:
      return {
        ...state,
        loading: false,
        industries: payload
      };
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default industriesReducer;
