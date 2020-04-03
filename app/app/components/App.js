import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { configureStore, history } from '../store/configureStore';

import Routes from './Routes';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';
import DragBar from './DragBar';

const store = configureStore();
const routeType = isPrivate => (isPrivate ? PrivateRoute : Route);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <DragBar />
          <NavBar />
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
        </div>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(App);
