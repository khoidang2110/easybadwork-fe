// In slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProductCart } from '@/interfaces/product';
interface CartState {
  items: IProductCart[]; // Assuming the cart contains string IDs
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IProductCart>) {
      state.items.push(action.payload);
     
    },
    updateItem(state, action: PayloadAction<IProductCart[]>) {
      state.items = action.payload;
     
    },
  },
});

export const { addItem,updateItem } = cartSlice.actions;
export default cartSlice.reducer;
