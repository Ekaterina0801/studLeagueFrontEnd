import { createStore, combineReducers } from 'redux';
import tournamentsReducer from './reducers/tournamentsReducer';
import teamsReducer from './reducers/teamsReducer';
import authReducer from "./slices/authSlice"
const rootReducer = combineReducers({
  tournaments: tournamentsReducer,
  teams: teamsReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
