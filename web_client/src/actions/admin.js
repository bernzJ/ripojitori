import { TYPES } from '../reducers/adminReducer';

const setUsers = payload => ({
  type: TYPES.GET_USERS,
  payload
});

export { setUsers };
