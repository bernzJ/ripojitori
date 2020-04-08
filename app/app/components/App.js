import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { configureFlashMessages } from 'redux-flash-messages';

import { configureStore, history } from '../store/configureStore';

import Routes from './Routes';
import NavBarBlue from './NavBarBlue';
import PrivateRoute from './PrivateRoute';
import DragBar from './DragBar';

const store = configureStore();
configureFlashMessages({
  dispatch: store.dispatch
});
const routeType = isPrivate => (isPrivate ? PrivateRoute : Route);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <DragBar />
        <NavBarBlue />
        <Switch>
          {Routes.map(({ isPrivate, scope, path, component }) => {
            const RouteComponent = routeType(isPrivate);
            return (
              <RouteComponent
                key={path}
                exact
                path={path}
                scope={scope}
                component={component}
              />
            );
          })}
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(App);
