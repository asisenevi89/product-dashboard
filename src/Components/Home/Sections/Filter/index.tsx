import React from 'react';
import { Typography, Button, Grid } from '@mui/material';

const FilterSection = () => {
  return (
    <div className='filter-section'>
      <Grid
        container direction="row"
        justifyContent="space-between"
        className='title-area'
      >
        <Typography variant="h4">Filters</Typography>
        <Button color='inherit'>Clear</Button>
      </Grid>
    </div>
    
  )
}

export default FilterSection;