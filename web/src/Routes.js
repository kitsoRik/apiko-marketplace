import React from "react";

import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";

import Register from "./components/pages/Register/Register";
import ForgotPassword from "./components/pages/ForgotPassword/ForgotPassword";
import RestorePassword from "./components/pages/RestorePassword";

import Profile from "./components/pages/Profile/Profile";
import EditProfile from "./components/pages/EditProfile/EditProfile";
import { Switch, Route } from "react-router-dom";
import SavedItems from "./components/pages/SavedItems/SavedItems";
import AddProduct from "./components/pages/AddProduct/AddProduct";
import Product from "./components/pages/Product/Product";
import Chats from "./components/pages/Chats/Chats";
import Cart from "./components/pages/Cart/Cart";
import Purchase from "./components/pages/Purchase/Purchase";
import Purchases from "./components/pages/Purchases/Purchases";
import PurchasesItem from "./components/pages/Purchases/PurchasesItem/PurchasesItem";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route
				exact
				path="/forgot-password"
				component={ForgotPassword}
			/>
			<Route
				exact
				path="/restore-password"
				component={RestorePassword}
			/>

			<Route exact path="/profile" component={Profile} />
			<Route exact path="/profile/:id" component={Profile} />
			<Route exact path="/edit-profile" component={EditProfile} />

			<Route exact path="/saved-items" component={SavedItems} />
			<Route exact path="/add-product" component={AddProduct} />

			<Route exact path="/products/:id" component={Product} />

			<Route exact path="/chats/" component={Chats} />
			<Route path="/chats/:id" component={Chats} />

			<Route exact path="/cart" component={Cart} />
			<Route exact path="/purchase" component={Purchase} />

			<Route exact path="/purchases" component={Purchases} />
			<Route exact path="/purchases/:id" component={PurchasesItem} />
		</Switch>
	);
};

export default Routes;
