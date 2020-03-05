const TYPES = {
  MESSAGES: 'MESSAGES',
  RESET: 'RESET'
};

const setMessage = payload => ({
  type: TYPES.MESSAGES,
  payload
});

const resetMessage = () => ({ type: TYPES.RESET });

const setMessageAndInvalidateSession = message => ({
  type: TYPES.MESSAGES,
  payload: {
    message,
    invalidateSesssion: true
  }
});

export { TYPES, setMessage, resetMessage, setMessageAndInvalidateSession };
