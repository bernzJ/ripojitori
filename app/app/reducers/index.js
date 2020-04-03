import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import messagesReducer from './messagesReducer';
import apiReducer from './apiReducer';
import tokenReducer from './tokenReducer';

const createRootReducer = history => {
  return combineReducers({
    router: history ? connectRouter(history) : null,
    authReducer,
    adminReducer,
    messagesReducer,
    apiReducer,
    tokenReducer
  });
};

export default createRootReducer;
