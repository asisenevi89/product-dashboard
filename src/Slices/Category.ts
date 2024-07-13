import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';
import { CategoryType } from '../CustomTypes';

const initialState = {
  isLoading: false,
  data: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryLoading: (state, action: PayloadAction<boolean>) => {
      _set(state, 'isLoading', action.payload);
    },
    setCategoryList(state, action: PayloadAction<CategoryType[]>) {
      _set(state, 'data', action.payload);
    },
  },
})

export const { setCategoryLoading, setCategoryList } = categorySlice.actions;
export default categorySlice.reducer;
