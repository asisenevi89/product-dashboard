import React, { memo } from 'react';
import {
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { FilterSelectType } from '../type';

const FilterSelect = ({
  id,
  label,
  labelId,
  selectedValue,
  onChange,
  options,
  isMultiple = false,
  isDisabled = false,
}: FilterSelectType) => {

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={selectedValue}
          label={label}
          onChange={onChange}
          multiple={isMultiple}
          disabled={isDisabled}
        >
          {options.map(option => (
            <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(FilterSelect);