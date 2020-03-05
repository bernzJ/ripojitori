import { TYPES } from '../actions/messages';

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
    default:
      return state;
  }
};

export default messagesReducer;
