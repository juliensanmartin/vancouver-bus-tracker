import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import car from './Car/reducers';
// import distance from './Distance/reducers';
import errors from './Error/reducers';

const appReducer = combineReducers({
  car,
  // distance,
  errors
});

const enhancer = applyMiddleware(
  thunk,
  createLogger({
    level: 'info',
    collapsed: true
  })
);

const store = createStore(appReducer, enhancer);

export default store;
