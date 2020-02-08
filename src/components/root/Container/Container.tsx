import * as React from 'react';
import { Switch } from 'react-router-dom';
import Header from '../Header/Header';
import RouteWithProps from '../../common/RouteWithProps/RouteWithProps';
import Routes from '../../../Router';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import styles from './container.module.scss';


export default class Container extends React.Component {
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
        <Footer label={'© Andrey Zhestkov'} />
      </div>
    )
  }
}
