import * as React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import styles from './container.scss';


export default class Container extends React.Component {
  render() {
    return (
      <div className={styles.appContainer}>
        <div className={styles.headerWrapper}>
          <Header title={'Some header text here'} />
        </div>
        <div className={styles.sidebarWrapper}>
          <Sidebar />
        </div>
        <div className={styles.footerWrapper}>
          <Footer label={'Some footer label here'} />
        </div>
      </div>
    )
  }
}
