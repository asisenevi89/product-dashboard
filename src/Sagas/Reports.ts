import axios from "axios";
import { put } from "redux-saga/effects";
import { setCategoryLoading, setCategoryList } from "../Slices/Category";
import { setProductsLoading, setProductsList } from "../Slices/Product";
import { CategoryType, ProductResponseType, InitActionType } from "../CustomTypes";
import {  } from "../CustomTypes";

type AxiosCategoryResponseType = {
  data: CategoryType[]
};

type AxiosProductResponseType = {
  data: ProductResponseType
};

export function* fetchCategories(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setCategoryLoading(true));
    const response: AxiosCategoryResponseType = yield axios.get(url);
    yield put(setCategoryList(response.data));
    yield put(setCategoryLoading(false));

  } catch (error) {
    yield put(setCategoryLoading(false));
    console.error(error);
  }
};

export function* fetchProducts(action: InitActionType) {
  const { url } = action;

  try {
    yield put(setProductsLoading(true));
    const response: AxiosProductResponseType = yield axios.get(url);
    yield put(setProductsList(response.data));
    yield put(setProductsLoading(false));

  } catch (error) {
    yield put(setProductsLoading(false));
    console.error(error);
  }
};