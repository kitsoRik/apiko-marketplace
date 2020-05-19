import React from "react";

import "./PaginationSector.scss";

const PaginationSector = ({
	value,
	onClick,
	disabled,
	className,
	isCurrent,
}) => {
	return (
		<button
			className={`pagination-sector ${className ?? ""}`}
			onClick={onClick}
			disabled={disabled ? true : null}
			current={isCurrent ? "true" : null}
		>
			{value}
		</button>
	);
};

export default PaginationSector;
