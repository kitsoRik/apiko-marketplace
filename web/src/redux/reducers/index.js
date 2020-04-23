import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import productsReducer from "./products-reducer";
import usersReducer from "./users-reducer";

export default combineReducers({
    user: userReducer,
    users: usersReducer,
    products: productsReducer
});