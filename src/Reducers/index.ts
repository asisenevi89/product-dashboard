import { combineReducers} from "redux";
import report from "./ReportReducer";

const rootReducer = combineReducers({
  report,
});

export default rootReducer;