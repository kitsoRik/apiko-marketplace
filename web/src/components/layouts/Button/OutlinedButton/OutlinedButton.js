import React from "react";

import "./OutlinedButton.scss";

const OutlinedButton = ({
	className,
	uppercase = false,
	value,
	icon,
	...props
}) => {
	return (
		<button
			className={`button-outlined ${className ?? ""}`}
			style={{ textTransform: uppercase ? "uppercase" : "none" }}
			{...props}
		>
			{icon && <div className="button-outlined-icon">{icon}</div>}
			{value}
		</button>
	);
};

export default OutlinedButton;
