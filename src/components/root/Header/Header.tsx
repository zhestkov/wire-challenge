import * as React from 'react'
import cn from 'classnames';
import styles from './header.module.scss';

interface IHeaderProps {
  title: string;
}

interface IHeaderState {
  sticky: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    sticky: false
  };

  render() {
    // const classNames = cn(styles.header);
    return <div className={styles.header}>Wire Challenge</div>;
  }
}
