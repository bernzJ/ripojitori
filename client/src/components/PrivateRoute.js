/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { routes } from '../constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const reducer = useSelector(({ authReducer }) => authReducer);
  return (
    <Route
      {...rest}
      render={props => {
        const { isAuthenticated, user: { scope } } = reducer;
        if (!isAuthenticated) {
          return (
            <Redirect to={{
              pathname: routes.LOGIN,
              state: {
                from: props.location,
                reError: "User not authenticated."
              }
            }}
            />
          )
        }
        if (scope !== props.scope) {
          return (
            <Redirect to={{
              pathname: routes.DASHBOARD,
              state: {
                from: props.location,
                reError: "Permission denied."
              }
            }}
            />
          )
        }
        return <Component {...props} />
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
  ]).isRequired,
  scope: PropTypes.number
};

PrivateRoute.defaultProps = {
  scope: 0
};