import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';
// import throttledMiddleware from './middlewares/throttle';

// TODO: think about conntected-react-router middleware

const middlewares = [thunk];
const enhancers = [];
const initialState = {};

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers
);

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers
);
