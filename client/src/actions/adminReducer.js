import axios from 'axios';

const TYPES = {
  GET_USERS: 'GET_USERS',
  AUTH_MESSAGE: 'AUTH_MESSAGE'
};

const getUsers = token => async (
  dispatch
) => {
  try {
    const { data } = await axios.post("admin/users", { 'x-auth-token': token });
    if (data.users) {
      dispatch({
        type: TYPES.GET_USERS,
        payload: data
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
      payload: error
    });
  }
};

export { TYPES, getUsers };
