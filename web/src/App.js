import React from "react";
import "./App.scss";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/other/Header/Header";
import Footer from "./components/other/Footer/Footer";
import Snackbar from "./components/other/Snackbar/Snackbar";
import Routes from "./Routes";
import useMessageSentSubscription from "./components/hooks/useMessageSentSubscription";
import useChatCreatedSubscription from "./components/hooks/useChatCreatedSubscription";
import useUserLeavedSubscription from "./components/hooks/useUserLeavedSubscription";

const App = () => {

	useMessageSentSubscription();
	useChatCreatedSubscription();
	useUserLeavedSubscription();

	return (
		<Router>
			<div className="app">
				<Header />
				<main>
					<Routes />
				</main>
				<Footer />
			</div>
			<Snackbar />
		</Router>
	);
};

export default App;
