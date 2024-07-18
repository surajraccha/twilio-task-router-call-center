// store.js
import { createStore, combineReducers } from 'redux';
import workerReducer from './workerReducer';

const rootReducer = combineReducers({
  worker: workerReducer,
  // Add more reducers if needed
});

const store = createStore(rootReducer, ['Use Redux']);

export default store;
