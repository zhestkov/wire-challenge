import * as React from 'react';
import { IPackage } from '../../../shared/interfaces/IPackage';
import styles from './search-item.module.scss';

interface ISearchItemProps {
  pkg: IPackage;
  children?: React.ReactNode;
}

// TODO: move to utils?
const REGEXP_OWNER = /(?<=github.com\/).*\//;

export default function SearchItem({ pkg }: ISearchItemProps) {
  let owner = pkg.repository_url.match(REGEXP_OWNER)![0];
  if (owner) {
    owner = owner.slice(0, -1);
  }
  return (
    <div className={styles.searchItem}>
      <div className={styles.metaInfo}>
        <div className={styles.packageName}>{pkg.name}</div>
        <a href={pkg.homepage}>{pkg.homepage}</a>
        <div className={styles.packageDescription}>{pkg.description}</div>
      </div>
      <div className={styles.owner}>
        <span className={styles.ownerTitle}>Owner: </span>
        <span>{owner}</span>
      </div>
      <div className={styles.stars}>
        <span className={styles.starsTitle}>Stars: </span>
        <span>{pkg.stars}</span>
        </div>
    </div>
  );
}
