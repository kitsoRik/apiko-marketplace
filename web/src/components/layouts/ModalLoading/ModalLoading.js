import React from "react";

import Loading from "../../../assets/icons/loading.svg";

import "./ModalLoading.scss";

const ModalLoading = ({
	style,
	darken = true,
	fillPercent = 100,
	className,
	...props
}) => {
	return (
		<div
			className={`modal-loading ${className}`}
			style={style}
			darken={darken ? "true" : null}
			onClick={(e) => e.preventDefault()}
			{...props}
		>
			<img
				style={{
					maxWidth: `${fillPercent}%`,
					maxHeight: `${fillPercent}%`,
				}}
				src={Loading}
				alt="Loading"
			/>
		</div>
	);
};

export default ModalLoading;
