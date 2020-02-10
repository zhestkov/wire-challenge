import * as React from 'react'
import './sidebar.module.scss';
import Routes, { IRoute } from '../../../Router';
import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.scss';

interface ISidebarProps {
  list?: any[];
}

interface ISidebarState {
  opened: boolean;
}

export default class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  state: ISidebarState = {
    opened: true
  };

  render() {
    return <div className={styles.sidebar}>
      {!this.props.list && Routes.map((route: IRoute) =>
        <NavLink
          key={route.name}
          exact={route.exact}
          className={styles.link}
          to={route.path}
          activeClassName={styles.isActiveLink}>
          {route.label}
        </NavLink>)}
    </div>;
  }
}
