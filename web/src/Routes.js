import React from 'react';

import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';

import Register from './components/pages/Register/Register';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword';
import RestorePassword from './components/pages/RestorePassword';

import Profile from './components/pages/Profile/Profile';
import EditProfile from './components/pages/EditProfile/EditProfile';
import { Switch, Route } from 'react-router-dom';
import SavedItems from './components/pages/SavedItems/SavedItems';
import AddProduct from './components/pages/AddProduct/AddProduct';
import Product from './components/pages/Product/Product';
import Chats from './components/pages/Chats/Chats';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/restore-password" component={RestorePassword} />

            <Route exact path="/profile" component={Profile} />
            <Route exact path="/edit-profile" component={EditProfile} />

            <Route exact path="/saved-items" component={SavedItems} />
            <Route exact path="/add-product" component={AddProduct} />

            <Route exact path="/products/:id" component={Product} />

            <Route exact path="/chats/" component={Chats} />
            <Route path="/chats/:id" component={Chats} />
        </Switch>
    )
};

export default Routes;