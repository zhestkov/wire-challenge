import * as React from 'react';
import { IPackage } from '../../../shared/interfaces/IPackage';
import styles from './search-item.module.scss';

interface ISearchItemProps {
  pkg: IPackage;
  children?: React.ReactNode;
}

// TODO: move to utils?
const REGEXP_OWNER = '(?<=github.com\\/).*\\/';

export default function SearchItem({ children, pkg }: ISearchItemProps) {
  let owner = pkg.repository_url.match(/(?<=github.com\/).*\//)![0];
  if (owner) {
    owner = owner.slice(0, -1);
  }
  return (
    <div className={styles.searchItem}>
      <div className={styles.metaInfo}>
        <div>{pkg.name}</div>
        <div>{pkg.homepage}</div>
        <div>{pkg.description}</div>
      </div>
      <div className={styles.owner}>{owner}</div>
      <div className={styles.stars}>{pkg.stars}</div>
    </div>
  );
}
