import { createStore, combineReducers } from 'redux';
import tournamentsReducer from './reducers/tournamentsReducer';

const rootReducer = combineReducers({
  tournaments: tournamentsReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
