// Trong file slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    update(state, action) {
      state.count = action.payload;
    },
  },
});

export const { increment,update } = counterSlice.actions;
export default counterSlice.reducer;
