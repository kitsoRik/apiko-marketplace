import React from 'react';

import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';

import Register from './components/pages/Register/Register';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword';
import RestorePassword from './components/pages/RestorePassword';

import Profile from './components/pages/Profile/Profile';
import EditProfile from './components/pages/EditProfile/EditProfile';
import { Switch, Route } from 'react-router-dom';

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
        </Switch>
    )
};

export default Routes;