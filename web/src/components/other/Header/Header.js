import React, { useEffect, useState } from "react";

import "./Header.scss";
import { useHistory, useLocation } from "react-router-dom";
import withScreenSize from "../../hocs/withScreenSize/withScreenSize";
import DesktopHeader from "./DesktopHeader/DesktopHeader";
import MobileHeader from "./MobileHeader/MobileHeader";
import { debounce } from "lodash";

const Header = ({ screenSize }) => {

	const { pathname } = useLocation();
	const [visibleSearchPanel, setVisibleSearchPanel] = useState(false);

	useEffect(() => {
		setVisibleHeaderSearchPanel = debounce(setVisibleSearchPanel, 1);
		return () => setVisibleHeaderSearchPanel = () => { }
	}, []);

	const darkMode = !["/login", "/register", "/forgot-password"].find(
		(p) => p === pathname
	);

	return (
		<div className="header-wrapper" dark-mode={darkMode ? "true" : null}>
			{screenSize.width > 480 && <DesktopHeader visibleSearchPanel={visibleSearchPanel} />}
			{screenSize.width <= 480 && <MobileHeader visibleSearchPanel={visibleSearchPanel} />}
		</div>
	);
};

export default withScreenSize(Header);

export let setVisibleHeaderSearchPanel = () => { }