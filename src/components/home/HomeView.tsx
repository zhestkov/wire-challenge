import React from 'react';
import Routes, {RoutesEnum, IRoute} from '../../Router';

interface IHomeViewProps {
  children: React.ReactChildren;
}

export default (props: IHomeViewProps) => {
  const searchRoute = Routes.find((route: IRoute) =>
    RoutesEnum.SEARCH_PAGE === route.name);
  return <div><a href={(searchRoute && searchRoute.path) || ''}>Go to search page</a></div>
}
