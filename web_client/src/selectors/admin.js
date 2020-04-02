import { createSelector } from 'reselect';

const getUsers = ({ adminReducer: { users } }) => users;

const getAllUsers = createSelector([getUsers], users => users);

export default getAllUsers;
