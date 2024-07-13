import { SelectChangeEvent } from '@mui/material';

export type FilterSelectType = {
  id: string,
  label: string,
  labelId: string,
  selectedValue: any,
  onChange: (event: SelectChangeEvent) => void
  options: SelectOptionType[],
  isMultiple?: boolean,
};

export type SelectOptionType = {
  value: string | number,
  label: string,
}