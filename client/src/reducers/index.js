import { combineReducers } from 'redux';
import authReducer from './authReducer';

const createRootReducer = () => {
  return combineReducers({
    authReducer,
  });
};

export default createRootReducer;
