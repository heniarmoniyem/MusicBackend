import {call, put} from 'redux-saga/effects';

import {requestGetSong} from '../request/song';

export function* handleGetSong(action) {
  try {
    const response = yield call(requestGetSong);
    const {data} = response;
    // yield put({type: 'GET_SONGS_SUCCESS', payload: data});
  } catch (error) {
    // yield put({type: 'GET_SONGS_FAILURE', payload: error});
  }
}