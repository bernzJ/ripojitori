/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
// import { addError, addWarning } from 'redux-flash-messages';

import { routes } from '../constants';

const PrivateRoute = ({ component, children, scope, ...rest }) => {
  const Component = component || children;
  const reducer = useSelector(({ authReducer }) => authReducer);
  return (
    <Route
      {...rest}
      render={props => {
        const {
          isAuthenticated,
          user: { scope: userScope }
        } = reducer;
        if (!isAuthenticated) {
          // addWarning({ text: 'User not authenticated.' });
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
          // @NOTE: this create render errors.
          /**
          addError({
            text: 'Permission denied.',
            data: 'PrivateRoute.js userScope < scope'
          });
          */
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
