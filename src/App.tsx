import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Container from './components/root/Container/Container';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Router>
          <Switch>
            <Route component={Container} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
