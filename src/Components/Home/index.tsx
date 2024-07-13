import React from 'react';
import Grid from '@mui/material/Grid'
import ChartSection from "./Sections/Chart";
import FilterSection from "./Sections/Filter";
import Spinner from '../Common/Spinner';
import './styles.scss';

const Home = () => {
  return (
    <Grid container spacing={2} className='home-container'>
      <Grid item xs={4} className='filter-section-wrapper'>
        <FilterSection />
      </Grid>
      <Grid item xs={8} className='chart-section-wrapper'>
        <ChartSection />
      </Grid>
    </Grid>
  );
}

export default Home;
