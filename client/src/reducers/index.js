import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';

const createRootReducer = () => {
  return combineReducers({
    authReducer,
    adminReducer
  });
};

export default createRootReducer;
