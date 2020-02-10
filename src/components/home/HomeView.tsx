import React from 'react';
import Routes, {RoutesEnum, IRoute} from '../../Router';
import { Link } from 'react-router-dom';

interface IHomeViewProps {
  children: React.ReactChildren;
}

export default (props: IHomeViewProps) => {
  const searchRoute = Routes.find((route: IRoute) =>
    RoutesEnum.SEARCH_PAGE === route.name);
  return (
    <div>
      <Link to={(searchRoute && searchRoute.path) || '/'}>
        Go to search page
      </Link>
    </div>
  );
}
