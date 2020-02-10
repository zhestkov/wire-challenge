import React from 'react';
import styles from './footer.module.scss'


interface IFooterProps {
  label: string;
}

export default function Footer({ label }: IFooterProps) {
  return (
    <footer>
      <span className={styles.footerLabel}>{ label }</span>
    </footer>
  );
};
