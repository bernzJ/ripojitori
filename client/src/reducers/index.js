import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import messagesReducer from './messagesReducer';
import apiReducer from './apiReducer';

const createRootReducer = () => {
  return combineReducers({
    authReducer,
    adminReducer,
    messagesReducer,
    apiReducer
  });
};

export default createRootReducer;
