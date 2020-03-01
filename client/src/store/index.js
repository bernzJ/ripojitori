import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-thunk';
import createRootReducer from '../reducers';

export default initialState =>
  createStore(createRootReducer(), initialState, applyMiddleware(promise));