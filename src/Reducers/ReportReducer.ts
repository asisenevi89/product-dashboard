import { combineReducers} from "redux";
import categoryReducer from "../Slices/Category";
import productReducer from "../Slices/Product";
import selectionReducer from "../Slices/Selections";

const reportReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
  selections: selectionReducer,
})

export default reportReducer;