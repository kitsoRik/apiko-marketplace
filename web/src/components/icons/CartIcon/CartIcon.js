import React from "react";

import "./CartIcon.scss";

const CartIcon = (props) => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 512 512"
			enableBackground="new 0 0 512 512"
			space="preserve"
			{...props}
		>
			<g>
				<path
					fill="none"
					stroke="#fff"
					strokeWidth="37"
					strokeLinecap="round"
					strokeMiterlimit="10"
					d="M63.5,63.5h27.3
		c6.5,0,12.3,3.9,14.8,9.8l73.7,175.3c2.5,6,8.3,9.8,14.8,9.8h153.4c5.6,0,10.8-2.9,13.7-7.7l90.3-147.3"
				/>
				<path
					fill="none"
					stroke="#fff"
					strokeWidth="37"
					strokeLinecap="round"
					strokeMiterlimit="10"
					d="M183.5,258.5
		c0,0-56.6,66.2-31,77c26,11,255,5,255,5"
				/>

				<line
					fill="none"
					stroke="#fff"
					strokeWidth="37"
					strokeLinecap="round"
					strokeMiterlimit="10"
					x1="320.5"
					y1="63.5"
					x2="234.5"
					y2="170.5"
				/>

				<circle
					fill="none"
					stroke="#fff"
					strokeWidth="37"
					strokeLinecap="round"
					strokeMiterlimit="10"
					cx="237.5"
					cy="63.5"
					r="4"
				/>

				<circle
					fill="none"
					stroke="#fff"
					strokeWidth="37"
					strokeLinecap="round"
					strokeMiterlimit="10"
					cx="320.5"
					cy="170.5"
					r="4"
				/>
				<circle
					fill="#fff"
					strokeLinecap="round"
					strokeMiterlimit="10"
					cx="172.5"
					cy="425.5"
					r="37"
				/>
				<circle
					fill="#fff"
					strokeLinecap="round"
					strokeMiterlimit="10"
					cx="385.5"
					cy="425.5"
					r="37"
				/>
			</g>
		</svg>
	);
};

export default CartIcon;
