import { fetchSongs, postSongs, deleteSongs, updateSongs } from './songThunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  status: 'idle',
  error: null,
};

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        return {
          ...state,
          songs: action.payload,
          status: 'succeeded',
        };
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //post songs
      .addCase(postSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.songs = state.songs.concat(action.payload);
      })
      .addCase(postSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      //delete songs
      .addCase(deleteSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.songs = state.songs.concat(action.payload);
        console.log('action.payload: ', action.payload);
      })
      .addCase(deleteSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      //update songs
      .addCase(updateSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSongs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.songs = state.songs.concat(action.payload);
        console.log('action.payload: ', action.payload);
      })
      .addCase(updateSongs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default songSlice.reducer;
