// In slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: string[]; // Assuming the cart contains string IDs
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.items.push(action.payload);
     
    },
    updateItem(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
     
    },
  },
});

export const { addItem,updateItem } = cartSlice.actions;
export default cartSlice.reducer;
