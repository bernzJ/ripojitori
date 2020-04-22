import { combineReducers } from 'redux';
import { flashMessage } from 'redux-flash-messages';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import customersReducer from './customersReducer';

const createRootReducer = () => {
  return combineReducers({
    flashMessage,
    authReducer,
    adminReducer,
    customersReducer
  });
};

export default createRootReducer;
