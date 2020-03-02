import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../store';

import Routes from './Routes';
import NavBar from './NavBar';
import Loading from './Loading';
import PrivateRoute from './PrivateRoute';

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
                <div>
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
