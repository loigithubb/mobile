import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBikes = createAsyncThunk('bikes/fetchBikes', async () => {
  const response = await fetch('https://64596be58badff578e0cf0f7.mockapi.io/api/bike');
  return response.json();
});

export const addBike = createAsyncThunk('bikes/addBike', async (newBike) => {
  const response = await fetch('https://64596be58badff578e0cf0f7.mockapi.io/api/bike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBike),
  });
  return response.json();
});

const bikesSlice = createSlice({
  name: 'bikes',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBikes.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addBike.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default bikesSlice.reducer;