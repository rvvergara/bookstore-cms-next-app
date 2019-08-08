import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const middleWares = process.env.NODE_ENV === 'development' ? composeEnhancers(applyMiddleware(thunk, logger)) : compose(applyMiddleware(thunk));

export default (initialState = {}) => createStore(
  rootReducer,
  initialState,
  middleWares,
);
