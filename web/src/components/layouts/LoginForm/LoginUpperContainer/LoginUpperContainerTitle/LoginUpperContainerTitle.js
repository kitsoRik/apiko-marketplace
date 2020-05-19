import React from "react";

import "./LoginUpperContainerTitle.scss";

const LoginUpperContainerTitle = ({ className, children }) => {
	return (
		<h4 className={`login-upper-container-title ${className}`}>
			{children}
		</h4>
	);
};

export default LoginUpperContainerTitle;
