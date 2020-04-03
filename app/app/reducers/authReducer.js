import { TYPES } from '../actions/auth';
import { TYPES as MSG_TYPES } from '../actions/messages';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MSG_TYPES.MESSAGES: {
      const { invalidateSesssion } = payload;
      if (invalidateSesssion === true) {
        return initialState;
      }
      return state;
    }
    case TYPES.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    case TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
