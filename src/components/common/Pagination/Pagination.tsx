import React from 'react';
import cn from 'classnames';
import styles from './pagination.module.scss';


type TPaginationProps = {
  className?: string;
}

type TPaginationState = {

}


export default class Pagination extends React.Component<TPaginationProps, TPaginationState> {
  render() {
    const { className } = this.props;
    return <div className={cn(styles.pagination, className)}>TODO: Pagination</div>
  }
}
