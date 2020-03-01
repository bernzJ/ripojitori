import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../store';
import { routes, scopes } from '../constants';

import Loading from './Loading';
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Admin from './Admin';

const App = () => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {(bootstrapped) => {
          if (bootstrapped && loaded) {
            return (
              <Router>
                <Switch>
                  <PrivateRoute path={routes.ADMIN} scope={scopes.ADMIN} component={Admin} />
                  <PrivateRoute
                    exact
                    path={routes.DASHBOARD} 
                    scope={scopes.PLEB}
                    component={Dashboard}
                  />
                  <Route path={routes.LOGIN} component={Login} />
                </Switch>
              </Router>
            );
          }
          return <Loading callback={()=> setLoaded(true)} />
        }}
      </PersistGate>
    </Provider>
  );
};

export default App;
