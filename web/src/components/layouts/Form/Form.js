import React from "react";

import "./Form.scss";

const Form = ({ className = "", children, asForm = false, ...props }) => {
	const asComponent = asForm ? "form" : "div";

	return React.createElement(
		asComponent,
		{ className: `form ${className}`, ...props },
		children
	);
};

export default Form;
