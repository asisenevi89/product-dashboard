import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _set from 'lodash/set';
import { SelectionType } from '../Components/Home/Sections/Filter/type';
import { MultiSelectType } from '../Components/Home/Sections/Filter/type';

const initialProducts: MultiSelectType = []

const initialState = {
  lastReportRun: 0,
  selectedCategory: '',
  selectedProducts: initialProducts,
};

const selectionSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setLastReportRun: (state, action: PayloadAction<number>) => {
      _set(state, 'lastReportRun', action.payload);
    },
    updateSelections(state, action: PayloadAction<SelectionType>) {
      state.selectedCategory = action.payload.selectedCategory;
      state.selectedProducts = action.payload.selectedProducts
    },
  },
})

export const { setLastReportRun, updateSelections } = selectionSlice.actions;
export default selectionSlice.reducer;
