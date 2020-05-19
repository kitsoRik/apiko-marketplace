import React from "react";

import "./DialogTitle.scss";

const DialogTitle = ({ value, className, ...props }) => {
	return (
		<h2 className={`dialog-title ${className ?? ""}`} {...props}>
			{value}
		</h2>
	);
};

export default DialogTitle;
