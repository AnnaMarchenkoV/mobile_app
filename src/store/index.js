import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const initialState = {};
const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (typeof window.devToolsExtension === 'function') {
  enhancers.push(
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);

export default store;
