import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _uniq from 'lodash/uniq';
import {
  Typography,
  Button,
  Grid,
  SelectChangeEvent,
  Box
} from '@mui/material';
import {
  initFetchCategories,
  initFetchProductsByCategory,
} from '../../../../ActionCreators/Report';
import {
  setLastReportRun,
  updateSelections,
} from '../../../../Slices/Selections';
import { 
  makeCategoriesLoading,
  makeCategoryData,
  makeProductData,
  makeProductsLoading,
} from '../../../../Selectors';
import FilterSelect from './Partials/FilterSelect';
import Spinner from '../../../Common/Spinner';
import { CategoryType, ProductType } from '../../../../CustomTypes';

const stateSelector = createStructuredSelector({
  categoriesLoading: (state) => makeCategoriesLoading(state),
  categories: (state) => makeCategoryData(state),
  products: (state) => makeProductData(state),
  productsLoading: (state) => makeProductsLoading(state)
});

const FilterSection = () => {
  const dispatch = useDispatch();
  const {
    categoriesLoading,
    categories,
    products,
    productsLoading,
  } = useSelector(stateSelector);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [filtersChanged, setFiltersChanged] = useState(false)

  useEffect(() => {
    dispatch(initFetchCategories())
  }, []);

  useEffect(() => {
    dispatch(updateSelections({
      selectedCategory,
      selectedProducts: [],
    }));
  }, [selectedCategory]);

  const onCategoryChanged = (event: SelectChangeEvent) => {
    const { value } = event.target; 
    setSelectedCategory(value);
    setSelectedProducts([]);

    dispatch(initFetchProductsByCategory(value));
    setFiltersChanged(true);
  };

  const onProductsChanged = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const updatedArr = Array.isArray(value)
      ? [...selectedProducts, ...value]
      : [...selectedProducts, parseInt(value)]
    const updated = _uniq(updatedArr);

    if (JSON.stringify(updated) === JSON.stringify(selectedProducts)) return;
    
    setSelectedProducts(updated);
    setFiltersChanged(true);
  };

  const getCategoryOptions = () => 
    categories.map((category: CategoryType) => (
      { value: category.slug, label: category.name }
    ));

  const getProductOptions = () =>
    products.map((product: ProductType) => (
      { value: product.id, label: product.title }
    ));

  const onClearFilters = () => {
    setSelectedCategory('');
    setSelectedProducts([]);
    setFiltersChanged(false);
  };
  
  const onRunReport = () => {
    setFiltersChanged(false);
    dispatch(updateSelections({
      selectedCategory,
      selectedProducts,
    }));
    dispatch(setLastReportRun(Date.now()));
  };

  const clearCategory = () => {
    onClearFilters();
  };

  const clearProducts = () => {
    setSelectedProducts([]);
    setFiltersChanged(true);
  };

  const isButtonDisabled = () => !selectedCategory || !filtersChanged;

  return (
    <Spinner backdropProps={{ open: categoriesLoading || productsLoading}}>
      <Grid
        container 
        className='filter-section' 
        direction="column" 
        justifyContent="space-between"
      >
        <Grid container>
          <Grid
            container direction="row"
            justifyContent="space-between"
            className='title-area'
          >
            <Typography variant="h4">Filters</Typography>
            <Button color='inherit' onClick={onClearFilters}>Clear</Button>
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
              options={getCategoryOptions()}
              onClearSelection={clearCategory} 
            />
            <FilterSelect
              labelId="product-label"
              id="product-select"
              selectedValue={selectedProducts}
              label="Select Product"
              onChange={onProductsChanged}
              options={getProductOptions()}
              isMultiple
              isDisabled={!selectedCategory}
              onClearSelection={clearProducts}
            />
          </Grid>
        </Grid>
        <Box className={`button-wrapper ${isButtonDisabled() ? 'disabled' : ''}`}>
          <Button
            variant='contained'
            disabled={isButtonDisabled()}
            onClick={onRunReport}
          >
            Run Report
          </Button>
        </Box>
      </Grid>
    </Spinner>
  );
}

export default memo(FilterSection);
