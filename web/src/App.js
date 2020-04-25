import React, { useEffect } from 'react';
import './App.scss';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/layouts/Header/Header';
import Footer from './components/layouts/Footer/Footer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadData } from './redux/actions/user-actions';
import Snackbar from './components/layouts/Snackbar/Snackbar';
import Routes from './Routes';

const App = ({ loadData }) => {

	useEffect(() => {
		loadData();
	}, []);

	return (
		<BrowserRouter>
			<div className="app">
				<Header />
				<main>
					<Routes />
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
