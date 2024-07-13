import React, { memo } from 'react';
import {
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { FilterSelectType, SelectOptionType } from '../type';

const FilterSelect = ({
  id,
  label,
  labelId,
  selectedValue,
  onChange,
  options,
  isMultiple = false
}: FilterSelectType) => (
  <Box>
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={selectedValue}
        label="Selecte Category"
        onChange={onChange}
        multiple={isMultiple}
      >
        {options.map(option => (
          <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
)

export default memo(FilterSelect);