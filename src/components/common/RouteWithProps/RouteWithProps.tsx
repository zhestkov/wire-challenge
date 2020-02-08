import React from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from '../../../Router';

export const RouteWithProps = (route: IRoute) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  )
};

export default RouteWithProps;
