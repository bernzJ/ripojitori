import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import { routes, scopes } from '../constants';

import PrivateRoute from '../components/PrivateRoute';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

const App = () => (
  <Provider store={store()}>
    <Router>
      <Switch>
        <PrivateRoute exact path={routes.DASHBOARD} scope={scopes.PLEB} component={Dashboard} />
        <Route path={routes.LOGIN} component={Login} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
