import React from "react";

import "./SortIcon.scss";

const SortIcon = ({ className, order = "ASC", ...props }) => {
	return (
		<svg
			className={`sort-icon ${className ?? ""}`}
			order={order}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 28 28"
			{...props}
		>
			<path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</svg>
	);
};

export default SortIcon;
