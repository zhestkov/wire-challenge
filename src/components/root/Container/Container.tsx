import * as React from 'react';
import { Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import RouteWithProps from '../../common/RouteWithProps/RouteWithProps';
import Footer from '../Footer/Footer';
import styles from './container.module.scss';
import Routes from '../../../Router';


export default class Container extends React.Component {
  static renderView(view: React.ReactNode) {

  }
  render() {
    return (
      <div className={styles.appContainer}>
          <Header title={'Some header text here'} />
        <main>
          <Sidebar />
          <Switch>
            {Routes.map((route, idx) => <RouteWithProps key={idx} {...route} />)}
          </Switch>
        </main>
        <Footer label={'Some footer label here'} />
      </div>
    )
  }
}
