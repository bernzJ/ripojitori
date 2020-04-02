import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import testReducer from './testReducer';

const createRootReducer = history => {
  return combineReducers({
    router: history ? connectRouter(history) : null,
    testReducer
  });
};

export default createRootReducer;
