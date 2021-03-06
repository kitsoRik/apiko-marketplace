import React, { useState, useEffect } from "react";

const withScreenSize = (WrapperComponent) => (props) => {
	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const func = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener("resize", func);

		return () => window.removeEventListener("resize", func, false);
	}, []);

	return <WrapperComponent {...props} screenSize={screenSize} />;
};

export default withScreenSize;
