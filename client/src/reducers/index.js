import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import messagesReducer from './messagesReducer';

const createRootReducer = () => {
  return combineReducers({
    authReducer,
    adminReducer,
    messagesReducer
  });
};

export default createRootReducer;
