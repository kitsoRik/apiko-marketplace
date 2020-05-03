import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import productsReducer from "./products-actions";

export default combineReducers({
    user: userReducer,
    products: productsReducer
});