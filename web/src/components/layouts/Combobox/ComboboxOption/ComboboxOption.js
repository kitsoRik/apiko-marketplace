import React from "react";

import "./ComboboxOption.scss";

const ComboboxOption = ({ value, icon, children, ...props }) => {
	return (
		<div className="combobox-option" {...props}>
			<div className="combobox-option-icon">{icon}</div>
			<p className="combobox-option-text">{children}</p>
		</div>
	);
};

export default ComboboxOption;
