import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import {
  getInitialStateRenderer,
  replayActionMain,
  replayActionRenderer,
  forwardToRenderer,
  forwardToMain,
  triggerAlias
} from 'electron-redux';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';
import isRenderer from '../utils/isRenderer';

const history = isRenderer ? createHashHistory() : null;

const configureStore = (
  initialState = isRenderer ? getInitialStateRenderer() : {}
) => {
  const rootReducer = createRootReducer(history);
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  if (history) {
    const router = routerMiddleware(history);
    middleware.push(router);
  }

  // Thunk & promise Middlewares
  middleware.push(thunk);
  // middleware.push(promise);

  // Router Middleware
  if (isRenderer) {
    middleware.unshift(forwardToMain);
  } else {
    // NOTE: this must be first.
    middleware.unshift(triggerAlias);
    middleware.push(forwardToRenderer);
  }

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test' && isRenderer) {
    middleware.push(logger);
  }

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions
  };
  let composeEnhancers;

  if (isRenderer) {
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Options: http://extension.remotedev.io/docs/API/Arguments.html
          actionCreators
        })
      : compose;
    /* eslint-enable no-underscore-dangle */
  } else {
    composeEnhancers = compose;
  }
  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    );
  }

  if (isRenderer) {
    replayActionRenderer(store);
  } else {
    replayActionMain(store);
  }

  return store;
};

export default { configureStore, history };
