import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watchSongRequests } from './sagas/songSagas';
import songReducer from './ducks/songs';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    song: songReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchSongRequests);

export default store;
