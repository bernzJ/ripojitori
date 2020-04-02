import { TYPES as ALIAS_TYPES } from '../actions/alias/test';
import { TYPES } from '../actions/test';

const initialState = {
  test: '',
  loading: true
};

const testReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_LOADING: {
      return { ...state, loading: payload };
    }
    case TYPES.SET_TEST: {
      return {
        ...state,
        test: payload
      };
    }
    case TYPES.GET_TEST:
    case ALIAS_TYPES.ALIAS_SAVE_TEST:
    case ALIAS_TYPES.ALIAS_LOAD_TEST:
    default:
      return state;
  }
};

export default testReducer;
