import { createSelector} from "reselect";
import _get from "lodash/get";

interface stateType {
  report: {}
}
const reportState = (state:stateType) => state.report;

export const makeReport = createSelector(
  reportState, data => data
);

export const makeCategoryData = createSelector(
  reportState, data => _get(data, 'categories.data', []),
);

export const makeCategoriesLoading = createSelector(
  reportState, data => _get(data, 'categories.isLoading', false),
);

export const makeProductData = createSelector(
  reportState, data => _get(data, 'products.data.products', []),
);

export const makeProductsLoading = createSelector(
  reportState, data => _get(data, 'products.isLoading', false),
);

export const makeLastReportRun = createSelector(
  reportState, data => _get(data, 'selections.lastReportRun', false),
);

export const makeSelectedCategory = createSelector(
  reportState, data => _get(data, 'selections.selectedCategory', ''),
);

export const makeSelectedProducts = createSelector(
  reportState, data => _get(data, 'selections.selectedProducts', []),
);
