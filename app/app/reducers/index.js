import { combineReducers } from 'redux';
import { flashMessage } from 'redux-flash-messages';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import apiReducer from './apiReducer';
import tokenReducer from './tokenReducer';

const createRootReducer = history => {
  return combineReducers({
    router: history ? connectRouter(history) : null,
    flashMessage,
    authReducer,
    adminReducer,
    apiReducer,
    tokenReducer
  });
};

export default createRootReducer;
