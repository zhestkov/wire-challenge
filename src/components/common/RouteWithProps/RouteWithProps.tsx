import React from 'react';
import { Route } from 'react-router-dom';
import { IRoute } from '../../../Router';



export const RouteWithProps = (route: IRoute) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      // render={props => ( // TODO: investigate `render` vs `component` and running component lifecycle
      //   <route.component {...props} routes={route.routes} />
      // )}
      component={route.component}
    />
  )
};

export default RouteWithProps;
