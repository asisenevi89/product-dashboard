import { takeEvery } from 'redux-saga/effects'
import {
  INIT_FETCH_CATEGORIES,
  INIT_FETCH_PRODUCTS,
} from "../ActionCreators/ActionTypes";
import { fetchCategories, fetchProducts } from './Reports';

export function* watchReports () {
  yield takeEvery(INIT_FETCH_CATEGORIES, fetchCategories);
  yield takeEvery(INIT_FETCH_PRODUCTS, fetchProducts);
}