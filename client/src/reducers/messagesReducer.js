import { TYPES } from '../actions/messages';

const initialState = {
  messages: [],
  invalidateSesssion: false
};

const messagesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.MESSAGES: {
      const { messages: prevMessages } = state;
      const { message } = payload;
      return {
        ...state,
        messages: [...prevMessages, message]
      };
    }
    default:
      return state;
  }
};

export default messagesReducer;
