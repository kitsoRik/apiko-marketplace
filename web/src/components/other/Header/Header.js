import React from "react";

import "./Header.scss";
import { useHistory } from "react-router-dom";
import withScreenSize from "../../hocs/withScreenSize/withScreenSize";
import DesktopHeader from "./DesktopHeader/DesktopHeader";
import MobileHeader from "./MobileHeader/MobileHeader";

const Header = ({ screenSize }) => {
	const history = useHistory();
	const darkMode = !["/login", "/register"].find(
		(p) => p === history.location.pathname
	);

	return (
		<div className="header-wrapper" dark-mode={darkMode ? "true" : null}>
			{screenSize.width > 480 && <DesktopHeader />}
			{screenSize.width <= 480 && <MobileHeader />}
		</div>
	);
};

export default withScreenSize(Header);
