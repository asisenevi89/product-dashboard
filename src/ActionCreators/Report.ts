import { 
  INIT_FETCH_CATEGORIES,
  INIT_FETCH_PRODUCTS,
} from "./ActionTypes";

const dataUrl = process.env.REACT_APP_BACKEND_URL;

export const initFetchCategories = () => {
  const url = `${dataUrl}/products/categories`;

  return {
    type: INIT_FETCH_CATEGORIES,
    url,
  };
};

export const initFetchProductsByCategory = (category: string) => {
  const url = `${dataUrl}/products/category/${category}`;

  return {
    type: INIT_FETCH_PRODUCTS,
    url,
  };
};