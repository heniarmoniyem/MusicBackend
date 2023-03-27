import { configureStore } from '@reduxjs/toolkit';
import songReducer from './songSlice/songSlice';
const store = configureStore({
  reducer: {
    songs: songReducer,
  },
});

export default store;
