import React, { useState } from "react";

import "./MobileHeader.scss";
import { Link, useHistory } from "react-router-dom";
import ApikoLogo from "../../ApikoLogo/ApikoLogo";

import HeaderSearchPanel from "../HeaderSearchPanel";
import BurgerIcon from "../../../icons/BurgerIcon/BurgerIcon";
import MobileHeaderMenu from "./MobileHeaderMenu/MobileHeaderMenu";

const MobileHeader = ({ visibleSearchPanel }) => {
	const history = useHistory();
	const darkMode = !["/login", "/register"].find(
		(p) => p === history.location.pathname
	);
	const minorPanel = visibleSearchPanel;

	const [userPanelOpen, setUserPanelOpen] = useState(false);

	const [visibleMenu, setVisibleMenu] = useState(false);

	return (
		<header className="mobile-header">
			<Link to="/">
				<ApikoLogo darkMode={darkMode} className="header__apiko-logo" />
			</Link>
			<button
				className="mobile-header-burger"
				onClick={() => setVisibleMenu(!visibleMenu)}
			>
				<BurgerIcon />
			</button>
			{minorPanel && (
				<div className="desktop-header-minor-panel">
					<HeaderSearchPanel />
				</div>
			)}

			{visibleMenu && (
				<MobileHeaderMenu onClose={() => setVisibleMenu(false)} />
			)}
		</header>
	);
};

export default MobileHeader;
