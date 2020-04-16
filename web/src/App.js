import React from 'react';
import './App.scss';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import Header from './components/layouts/Header/Header';
import Footer from './components/layouts/Footer/Footer';
import Register from './components/pages/Register/Register';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword';
import RestorePassword from './components/pages/RestorePassword';

function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Header />
      <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/restore-password" component={RestorePassword}/>
          </Switch>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
