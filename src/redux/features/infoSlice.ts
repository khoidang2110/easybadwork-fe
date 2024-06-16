// In slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInfo } from '@/interfaces/product';

interface InfoState {
  info: IInfo; 
}

const initialState: InfoState = {
  info: {},
};



const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    addInfo(state, action: PayloadAction<IInfo>) {
        state.info = action.payload;
     
    },
    // updateItem(state, action: PayloadAction<IProductCart[]>) {
    //   state.items = action.payload;
     
    // },
  },
});

export const { addInfo } = infoSlice.actions;
export default infoSlice.reducer;
