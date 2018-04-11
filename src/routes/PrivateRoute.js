import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './AppRouter';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
