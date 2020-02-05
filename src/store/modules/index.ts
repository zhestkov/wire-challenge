import { combineReducers } from 'redux';
import searchReducer from './search';
import loadingReducer from './loading';

const rootReducer = combineReducers({
  search: searchReducer,
  loading: loadingReducer
});

export type TRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
