import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSongs = createAsyncThunk(
  'songs/fetchSongs',
  async (name, { rejectWithValue }) => {
    const response = await fetch(
      `https://addissoftmusicapi.azurewebsites.net/song`
    );
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const postSongs = createAsyncThunk(
  'songs/postSongs',
  async (name, thunkAPI) => {
    const response = await fetch(
      `https://addissoftmusicapi.azurewebsites.net/song`,
      {
        method: 'POST',
        body: JSON.stringify(name),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(data);
    }
    thunkAPI.dispatch(fetchSongs());
    return data;
  }
);

export const deleteSongs = createAsyncThunk(
  'songs/deleteSongs',
  async (id, thunkAPI) => {
    const response = await fetch(
      `https://addissoftmusicapi.azurewebsites.net/song/`,
      {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(data);
    }
    thunkAPI.dispatch(fetchSongs());
    return data;
  }
);

// update Songs
export const updateSongs = createAsyncThunk(
  'songs/updateSongs',
  async (id, thunkAPI) => {
    const response = await fetch(
      `https://addissoftmusicapi.azurewebsites.net/song/`,
      {
        method: 'PATCH',
        body: JSON.stringify(id),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return thunkAPI.rejectWithValue(data);
    }
    thunkAPI.dispatch(fetchSongs());
    return data;
  }
);
