import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import { configureStore, history } from '../store/configureStore';
import App from './App';
import { routes } from '../constants';

const store = configureStore();

const Router = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route>
          <div>
            <Switch>
              <Route path={routes.HOME} component={App} />
            </Switch>
          </div>
        </Route>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(Router);
