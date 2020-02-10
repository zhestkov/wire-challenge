import React from 'react';
import SearchView from './components/search/SearchView';
import HomeView from './components/home/HomeView';

export enum RoutesEnum {
  HOME_PAGE = 'HomePage',
  SEARCH_PAGE = 'SearchPage'
}

export interface IRoute {
  path: string;
  exact?: boolean;
  name: string;
  label: string;
  component: React.ReactNode;
  routes?: IRoute[];
}

const Routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    name: RoutesEnum.HOME_PAGE,
    label: 'Home',
    component: HomeView
  },
  {
    path: '/search',
    name: RoutesEnum.SEARCH_PAGE,
    label: 'Search packages',
    component: SearchView
  },
];
export default Routes;
