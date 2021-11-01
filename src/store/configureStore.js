import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { load, save } from 'redux-localstorage-simple';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const PERSISTED_KEYS = ['app', 'transactions'];
const localStorageMiddleware = save({ states: PERSISTED_KEYS });

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  load({ states: PERSISTED_KEYS }),
  composeEnhancers(applyMiddleware(localStorageMiddleware), applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export { store };
