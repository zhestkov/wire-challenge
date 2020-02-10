import * as React from 'react';
import { IPackage } from '../../../shared/interfaces/IPackage';
import styles from './search-item.module.scss';

interface ISearchItemProps {
  className?: string;
  pkg: IPackage;
  children?: React.ReactNode;
}

// TODO: move to utils?
const REGEXP_OWNER = /^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/;

export default function SearchItem({ pkg }: ISearchItemProps) {
  let ownerMatch = pkg.repository_url.match(REGEXP_OWNER);
  const owner = (ownerMatch && ownerMatch[1]) || pkg.repository_url;
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
