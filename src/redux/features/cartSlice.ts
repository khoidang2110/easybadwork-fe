// In slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/interfaces/product';
interface CartState {
  items: IProduct[]; // Assuming the cart contains string IDs
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IProduct>) {
      state.items.push(action.payload);
     
    },
    updateItem(state, action: PayloadAction<IProduct[]>) {
      state.items = action.payload;
     
    },
  },
});

export const { addItem,updateItem } = cartSlice.actions;
export default cartSlice.reducer;
