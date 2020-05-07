import React from 'react';
import './App.scss';
import './index.scss';
import { BrowserRouter, useHistory } from 'react-router-dom';
import Header from './components/other/Header/Header';
import Footer from './components/other/Footer/Footer';
import Snackbar from './components/other/Snackbar/Snackbar';
import Routes from './Routes';

const App = () => {

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

export default App;
