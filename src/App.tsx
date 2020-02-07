import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Container from './components/root/Container/Container';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
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
