const TYPES = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER'
};

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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

export { TYPES, authReducer };
