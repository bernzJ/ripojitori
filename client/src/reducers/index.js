import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

export const createRootReducer = () => {
  return combineReducers({
    authReducer,
  });
};
