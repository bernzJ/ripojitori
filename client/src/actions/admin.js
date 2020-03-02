import axios from 'axios';

const TYPES = {
  IS_LOADING: false,
  GET_USERS: 'GET_USERS',
  AUTH_MESSAGE: 'AUTH_MESSAGE'
};

const getUsers = token => async dispatch => {
  try {
    dispatch({ type: TYPES.IS_LOADING });
    const { data } = await axios.post('admin/users', { 'x-auth-token': token });
    if (data.users) {
      dispatch({
        type: TYPES.GET_USERS,
        payload: data.users
      });
      return;
    }
    dispatch({
      type: TYPES.AUTH_MESSAGE,
      payload: data.message
    });
    return;
  } catch (error) {
    dispatch({
      type: TYPES.AUTH_MESSAGE,
      payload: error.message
    });
  }
};

export { TYPES, getUsers };
