/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { setMessage } from '../actions/messages';
import { routes } from '../constants';

const PrivateRoute = ({ component, children, scope, ...rest }) => {
  const Component = component || children;
  const reducer = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();
  return (
    <Route
      {...rest}
      render={props => {
        const {
          isAuthenticated,
          user: { scope: userScope }
        } = reducer;
        if (!isAuthenticated) {
          dispatch(setMessage({ message: 'User not authenticated.' }));
          return (
            <Redirect
              to={{
                pathname: routes.LOGIN,
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        if (userScope < scope) {
          // @TODO: create a path for this.
          dispatch(setMessage({ message: 'Permission denied.' }));
          return (
            <Redirect
              to={{
                pathname: routes.DASHBOARD,
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.func)
  ]),
  scope: PropTypes.number
};

PrivateRoute.defaultProps = {
  scope: 0,
  component: undefined
};
