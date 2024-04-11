// Trong file slices/localStorageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  localStorageData: null,
};

const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState,
  reducers: {
    updateLocalStorageData(state, action) {
      state.localStorageData = action.payload;
    },
  },
});

export const { updateLocalStorageData } = localStorageSlice.actions;
export default localStorageSlice.reducer;
