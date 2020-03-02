import { routes, scopes } from '../constants';
import Dashboard from './Dashboard';
import Admin from './Admin';
import Login from './Login';

const Routes = [
  {
    path: routes.DASHBOARD,
    name: 'DASHBOARD',
    isPrivate: true,
    scope: scopes.PLEB,
    component: Dashboard
  },
  {
    path: routes.ADMIN,
    name: 'ADMIN',
    isPrivate: true,
    scope: scopes.ADMIN,
    component: Admin
  },
  {
    path: routes.LOGIN,
    name: 'LOGIN',
    isPrivate: false,
    component: Login
  }
];

export default Routes;
