import React from "react";

import "./StarsInput.scss";
import StarIcon from "../../icons/StarIcon/StarIcon";


const StarsInput = ({ rate = 0, onRateChange = () => { } }) => {
	const onStarHover = (value, isRight) => {
		onRateChange(value - (isRight ? 0 : 0.5));
	};

	return (
		<div className="stars-input">
			{[1, 2, 3, 4, 5].map(
				renderStar(
					(value) => onStarHover(value, false),
					(value) => onStarHover(value, true),
					rate
				)
			)}
		</div>
	);
};

const renderStar = (onStarLeftHover, onStarRightHover, rate) => (
	value,
	index
) => {
	const isSemi = value > rate && value === rate + 0.5;
	const isEmpty = value > rate + 0.5;
	return (
		<StarIcon
			onLeftHover={() => onStarLeftHover(value)}
			onRightHover={() => onStarRightHover(value)}
			semi={isSemi}
			empty={isEmpty}
		/>
	);
};
export default StarsInput;
