import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureFlashMessages } from 'redux-flash-messages';

import { store, persistor } from '../store';

import Routes from './Routes';
import NavBarBlue from './NavBarBlue';
import Loading from './Loading';
import PrivateRoute from './PrivateRoute';

configureFlashMessages({
  dispatch: store.dispatch
});

const routeType = isPrivate => (isPrivate ? PrivateRoute : Route);

const App = () => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {bootstrapped => {
          if (bootstrapped && loaded) {
            return (
              <Router>
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
              </Router>
            );
          }
          return <Loading callback={() => setLoaded(true)} />;
        }}
      </PersistGate>
    </Provider>
  );
};

export default App;
