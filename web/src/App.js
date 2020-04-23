import React, { useEffect } from 'react';
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
import { Provider, connect } from 'react-redux';
import store from './redux/store';
import { compose } from 'redux';
import { loadData } from './redux/actions/user-actions';
import Snackbar from './components/layouts/Snackbar/Snackbar';
import Profile from './components/pages/Profile/Profile';

const App = ({ loadData }) => {

	useEffect(() => {
		loadData();
	}, []);

	return (
		<BrowserRouter>
			<div className="app">
				<Header />
				<main>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/forgot-password" component={ForgotPassword} />
						<Route exact path="/restore-password" component={RestorePassword} />
						
						<Route exact path="/profile" component={Profile} />
					</Switch>
				</main>
				<Footer />
			</div>
			<Snackbar />
		</BrowserRouter>
	);
}

export default compose(
	connect(null, { loadData })
)(App);
