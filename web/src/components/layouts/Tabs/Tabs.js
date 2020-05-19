import React from "react";

import "./Tabs.scss";
import Tab from "./Tab/Tab";

const Tabs = ({ onChangeTabIndex = () => {}, tabIndex = 0, children }) => {
	const onSelectTab = (index) => {
		onChangeTabIndex(index);
	};

	const tabsChildren = (children ?? [])
		.filter((c) => c.type === Tab)
		.map((c, index) => {
			return React.cloneElement(c, {
				onClick: () => onSelectTab(index === tabIndex ? -1 : index),
				active: index === tabIndex,
			});
		});

	return <div className="tabs">{tabsChildren}</div>;
};

export default Tabs;
