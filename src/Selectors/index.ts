import { createSelector} from "reselect";
import { get as _get } from "lodash";

interface stateType {
  reports: {}
}
const reportState = (state:stateType) => state.reports;

export const selectReport = createSelector(
  reportState, data => data
);