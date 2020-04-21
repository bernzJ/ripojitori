import { combineReducers } from 'redux';
import { flashMessage } from 'redux-flash-messages';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import apiReducer from './apiReducer';

const createRootReducer = () => {
  return combineReducers({
    flashMessage,
    authReducer,
    adminReducer,
    apiReducer
  });
};

export default createRootReducer;
