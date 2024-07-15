import React, { memo } from 'react';
import { createStructuredSelector } from 'reselect';
import HighCharts from 'highcharts';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import _get from 'lodash/get';
import {
  makeCategoriesLoading,
  makeCategoryData,
  makeProductsLoading,
  makeProductData,
  makeSelectedProducts,
  makeLastReportRun,
} from '../../../../Selectors';
import { makeSelectedCategory } from '../../../../Selectors';
import { usePrevious } from '../../../../Utils/CustomHooks';
import PieChart from './Partials/Pie';
import ColumnChart from './Partials/Column';
import Spinner from '../../../Common/Spinner';
import { CategoryType, ProductType } from '../../../../CustomTypes';
import { DEFAULT_CURRENCY } from '../../../../Utils/Constants';

type ColumnDataType = {
  seriesData: HighCharts.SeriesColumnOptions[],
  xAxisData: HighCharts.XAxisOptions,
};

const stateSelector = createStructuredSelector({
  categories: state => makeCategoryData(state),
  categoriesLoading: (state) => makeCategoriesLoading(state),
  selectedCategory: (state) => makeSelectedCategory(state),
  products: (state) => makeProductData(state),
  productsLoading: (state) => makeProductsLoading(state),
  selectedProducts: (state) => makeSelectedProducts(state),
  lastReportRun: (state) => makeLastReportRun(state),
});

const ChartSection = () => {
  const {
    categories,
    categoriesLoading,
    selectedCategory,
    products,
    productsLoading,
    selectedProducts,
    lastReportRun,
  } = useSelector(stateSelector);
  const prevValues = usePrevious({ lastReportRun });
  const prevReportRun = _get(prevValues, 'lastReportRun', 0);

  const getSelectedCategoryName = (): string => {
    const category: any = categories.find(
      (category: CategoryType) => category.slug === selectedCategory
    );
  
    return category ? category.name : '';
  };

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

  const getColumnChartSeriesData = (): ColumnDataType => {
    const items: number[] = [...selectedProducts];
    let filteredProducts = products;
  
    if (selectedProducts.length) {
      filteredProducts = products.filter((product: ProductType) => items.includes(product.id));
    }

    return {
      seriesData: [{ 
        name: 'Price',
        type: 'column',
        data: filteredProducts.map((product: ProductType) => product.price),
        dataLabels: { enabled: true, format: `{y} ${DEFAULT_CURRENCY}`}
      }],
      xAxisData: {
        categories: filteredProducts.map((product: ProductType) => product.title)
      }
    };
  };

  const renderChart = ()  => {
    let title = {};
    let subTitle = {};

    if (lastReportRun !== prevReportRun) {
      const { seriesData, xAxisData } = getColumnChartSeriesData();
      const categoryName = getSelectedCategoryName();
      const yAxisData = {
        title: { text: `${categoryName} prices in ${DEFAULT_CURRENCY}` },
      };

      return (
        <ColumnChart
          xAxis={xAxisData}
          series={seriesData}
          yAxis={yAxisData}
        />
      );
    }

    if (selectedCategory) {
      const categoryName = getSelectedCategoryName();

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
      <Grid container className='chart-container' alignItems='center'>
        {renderChart()}
      </Grid>
    </Spinner>
  );
};

export default memo(ChartSection);