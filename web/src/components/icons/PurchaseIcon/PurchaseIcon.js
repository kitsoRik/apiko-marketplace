import React from "react";

import "./PurchaseIcon.scss";

const PurchaseIcon = (props) => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 512 512"
			enable-background="new 0 0 512 512"
			space="preserve"
			{...props}
		>
			<g>
				<g>
					<path
						fill="#fff"
						d="M378.4,67.5c16,0,29.1,13.1,29.1,29.1v318.9c0,16-13.1,29.1-29.1,29.1H134.6c-16,0-29.1-13.1-29.1-29.1V96.6
			c0-16,13.1-29.1,29.1-29.1H378.4 M378.4,44.5H134.6c-28.7,0-52.1,23.4-52.1,52.1v318.9c0,28.7,23.4,52.1,52.1,52.1h243.9
			c28.7,0,52.1-23.4,52.1-52.1V96.6C430.5,67.9,407.1,44.5,378.4,44.5L378.4,44.5z"
					/>
				</g>

				<line
					fill="none"
					stroke="#fff"
					stroke-width="23"
					stroke-linecap="round"
					stroke-miterlimit="10"
					x1="159.5"
					y1="143.5"
					x2="342.5"
					y2="143.5"
				/>

				<line
					fill="none"
					stroke="#fff"
					stroke-width="23"
					stroke-linecap="round"
					stroke-miterlimit="10"
					x1="159.5"
					y1="202.5"
					x2="342.5"
					y2="202.5"
				/>

				<line
					fill="none"
					stroke="#fff"
					stroke-width="23"
					stroke-linecap="round"
					stroke-miterlimit="10"
					x1="159.5"
					y1="263.5"
					x2="262.5"
					y2="263.5"
				/>
				<circle
					stroke="#fff"
					stroke-width="6"
					stroke-miterlimit="10"
					cx="324"
					cy="384"
					r="10.5"
				/>
			</g>
		</svg>
	);
};

export default PurchaseIcon;
