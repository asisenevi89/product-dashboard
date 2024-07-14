import React, { memo } from 'react';
import {
  Select,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
  onClearSelection,
}: FilterSelectType) => {
  
  const disableClass = isDisabled ? 'disabled' : '';

  return (
    <Box className={disableClass}>
      <FormControl fullWidth className={disableClass}>
        <InputLabel id={labelId}>{label}</InputLabel>
        {!!selectedValue.length && (
          <HighlightOffIcon 
            sx={{
              fontSize: '16px',
              position: 'absolute',
              right: '30px',
              top: '20px',
              zIndex: 20,
              cursor: 'pointer',
              color: '#D22B2B',
            }}
            onClick={onClearSelection}
          />
          )}
        <Select
          labelId={labelId}
          id={id}
          value={selectedValue}
          label={label}
          onChange={onChange}
          multiple={isMultiple}
          disabled={isDisabled}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 400,
              },
              container: document.body,
            },
          }}
          sx={{ zIndex: 10 }}
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