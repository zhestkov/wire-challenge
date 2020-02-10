import * as React from 'react';
import { Switch } from 'react-router-dom';
import Header from '../Header/Header';
import RouteWithProps from '../../common/RouteWithProps/RouteWithProps';
import Routes from '../../../Router';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import styles from './container.module.scss';


export default function Container() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <main>
        <Sidebar />
        <Switch>
          {Routes.map((route, idx) => <RouteWithProps key={idx} {...route} />)}
        </Switch>
      </main>
      <Footer label={'© Andrey Zhestkov'} />
    </div>
  )
}
