import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import productsReducer from "./products-reducer";

export default combineReducers({
    user: userReducer,
    products: productsReducer
});