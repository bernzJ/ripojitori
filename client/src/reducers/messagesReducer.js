import { TYPES } from '../actions/messages';
import { TYPES as AUTH_TYPES } from '../actions/auth';

const initialState = {
  messages: [],
  invalidateSesssion: false
};

const messagesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.RESET: {
      return initialState;
    }
    case TYPES.MESSAGES: {
      const { messages: prevMessages } = state;
      const { message, invalidateSesssion = false } = payload;
      return {
        ...state,
        messages: [...prevMessages, message],
        invalidateSesssion
      };
    }
    case AUTH_TYPES.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default messagesReducer;
