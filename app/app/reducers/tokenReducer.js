import { TYPES as ALIAS_TYPES } from '../actions/alias/token';
import { TYPES } from '../actions/token';

const initialState = {
  token: '',
  saved: false,
  loading: true
};

const tokenReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_SAVED: {
      return { ...state, saved: payload };
    }
    case TYPES.SET_LOADING: {
      return { ...state, loading: payload };
    }
    case TYPES.SET_TOKEN: {
      return {
        ...state,
        token: payload
      };
    }
    case TYPES.GET_TOKEN:
    case ALIAS_TYPES.ALIAS_SAVE_TOKEN:
    case ALIAS_TYPES.ALIAS_LOAD_TOKEN:
    default:
      return state;
  }
};

export default tokenReducer;
