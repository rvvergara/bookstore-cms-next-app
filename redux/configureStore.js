import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const middleWares = composeWithDevTools(applyMiddleware(thunk, logger));

const devTools = process.env.NODE_ENV === 'development' ? middleWares : undefined;

export default (initialState = {}) => createStore(
  rootReducer,
  initialState,
  devTools,
);
