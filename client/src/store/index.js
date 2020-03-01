/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promise from 'redux-thunk';
import createRootReducer from '../reducers';

const middleware = [];
const enhancers = [];

const persistConfig = {
  key: 'ripojitori',
  storage
};
// @TODO: remove this if we don't use. This would save current route.
const actionCreators = {
  // ...routerActions
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
      actionCreators
    })
  : compose;

const persistedReducer = persistReducer(persistConfig, createRootReducer());

middleware.push(promise);
enhancers.push(applyMiddleware(...middleware));

const enhancer = composeEnhancers(...enhancers);
const store = createStore(persistedReducer, {}, enhancer);
const persistor = persistStore(store);

export { store, persistor };
