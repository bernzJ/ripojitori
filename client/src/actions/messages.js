const TYPES = {
  MESSAGES: 'MESSAGES'
};

const setMessage = message => ({
  type: TYPES.MESSAGES,
  payload: {
    message
  }
});

const setMessageAndInvalidateSession = message => ({
  type: TYPES.MESSAGES,
  payload: {
    message,
    invalidateSesssion: true
  }
});

export { TYPES, setMessage, setMessageAndInvalidateSession };
