import React, { memo } from 'react';
import { createStructuredSelector } from 'reselect';
import HighCharts from 'highcharts';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  makeCategoriesLoading,
  makeCategoryData,
  makeProductsLoading,
  makeProductData,
  makeSelectedProducts,
} from '../../../../Selectors';
import { makeSelectedCategory } from '../../../../Selectors';
import PieChart from './Partials/Pie';
import Spinner from '../../../Common/Spinner';
import { CategoryType, ProductType } from '../../../../CustomTypes';

const series: HighCharts.SeriesPieOptions[] = [{
  name: 'Count',
  type: 'pie',
  data: [
      {
          name: 'Water',
          y: 55.02
      },
      {
          name: 'Fat',
          y: 26.71
      },
      {
          name: 'Carbohydrates',
          y: 1.09
      },
      {
          name: 'Protein',
          y: 15.5
      },
      {
          name: 'Ash',
          y: 1.68
      }
  ]
}];

const stateSelector = createStructuredSelector({
  categories: state => makeCategoryData(state),
  categoriesLoading: (state) => makeCategoriesLoading(state),
  selectedCategory: (state) => makeSelectedCategory(state),
  products: (state) => makeProductData(state),
  productsLoading: (state) => makeProductsLoading(state),
  selectedProducts: (state) => makeSelectedProducts(state),
});

const ChartSection = () => {
  const {
    categories,
    categoriesLoading,
    selectedCategory,
    products,
    productsLoading,
    selectedProducts,
  } = useSelector(stateSelector);
  

  const getPieChartSeriesData = (): HighCharts.SeriesPieOptions[] => {
    if (selectedCategory) {
      return [{ 
        name: 'Price',
        type: 'pie',
        data: products.map((product: ProductType) => (
          { name: product.title, y: product.price  }
        )),
      }];
    }
    return [{ 
      name: 'Category',
      type: 'pie',
      data: categories.map((category: CategoryType) => (
        { name: category.name, y: 1 }
      )),
    }];
  };

  const renderChart = ()  => {
    let title = {};
    let subTitle = {};

    if (selectedCategory) {
      const category: any = categories.find((category: CategoryType) => category.slug === selectedCategory);
      const categoryName = category ? category.name : '';

      title = {
        text: `Products of the selected category - ${categoryName}`
      };
      subTitle = {
        text: `Price details of the selected category products`
      }
    }

    return <PieChart series={getPieChartSeriesData()} title={title} subTitle={subTitle}/>
  };

  return (
    <Spinner backdropProps={{ open: categoriesLoading || productsLoading }}>
      <Grid container className='chart-container'>
        {renderChart()}
      </Grid>
    </Spinner>
  );
};

export default memo(ChartSection);