import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/reducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
   reducer,
   applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

export default store