import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';
import { ProductResponseType } from '../CustomTypes';

const initialState = {
  isLoading: false,
  data: {
    limit: 0,
    skip: 0,
    total: 0,
    products: [],
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isLoading', action.payload);
    },
    setProductsList(state, action: PayloadAction<ProductResponseType>) {
      _set(state, 'data', action.payload);
    },
  },
})

export const { setProductsLoading, setProductsList } = productSlice.actions;
export default productSlice.reducer;
