import { createStore, combineReducers } from 'redux';
import tournamentsReducer from './reducers/tournamentsReducer';
import teamsReducer from './reducers/teamsReducer';

const rootReducer = combineReducers({
  tournaments: tournamentsReducer,
  teams: teamsReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
