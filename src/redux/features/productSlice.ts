// In slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IProductCart } from '@/interfaces/product';
interface ProductState {
  items: IProductCart[]; // Assuming the cart contains string IDs
}

const initialState: ProductState = {
  items: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  
    updateProduct(state, action: PayloadAction<IProductCart[]>) {
      state.items = action.payload;
     
    },
  },
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
