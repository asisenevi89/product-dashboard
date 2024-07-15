import { SelectChangeEvent } from '@mui/material';

export type MultiSelectType = number[] | string[];

export type FilterSelectType = {
  id: string,
  label: string,
  labelId: string,
  selectedValue: any,
  onChange: (event: SelectChangeEvent) => void
  options: SelectOptionType[],
  onClearSelection: () => void,
  isMultiple?: boolean,
  isDisabled?: boolean,
};

export type SelectOptionType = {
  value: string | number,
  label: string,
};

export type SelectionType = {
  selectedCategory: string,
  selectedProducts: MultiSelectType,
};