import React, { useState, memo } from 'react';
import {
  Typography,
  Button,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import FilterSelect from './Partials/FilterSelect';

const FilterSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const onCategoryChanged = (event: SelectChangeEvent) => {
    const { value } = event.target; 
    setSelectedCategory(value);
  };

  return (
    <Grid container className='filter-section' direction="column" justifyContent="space-between">
      <Grid container>
        <Grid
          container direction="row"
          justifyContent="space-between"
          className='title-area'
        >
          <Typography variant="h4">Filters</Typography>
          <Button color='inherit'>Clear</Button>
        </Grid>
        <Grid 
          container
          direction="column"
          justifyContent="space-around"
          className='filter-area'
        >
          <FilterSelect
            labelId="category-label"
            id="category-select"
            selectedValue={selectedCategory}
            label="Select Category"
            onChange={onCategoryChanged}
            options={[]}    
          />
          <FilterSelect
            labelId="product-label"
            id="product-select"
            selectedValue={selectedProducts}
            label="Selecte Product"
            onChange={onCategoryChanged}
            options={[]}    
          />
        </Grid>
      </Grid>
      <Button variant='contained'>
        Run Report
      </Button>
    </Grid>
  );
}

export default memo(FilterSection);
