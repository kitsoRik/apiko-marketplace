import React from "react";

import "./SaleCard.scss";

const SaleCard = ({
	id,
	product = { title: "" },
	user = { fullName: "" },
	date,
}) => {
	if (!user) throw new Error();
	const dateString = new Date(1970, 0, 1);

	dateString.setMilliseconds(date);

	return (
		<div className="sale-card">
			<div className="sale-card-icon">
				<img
					src="https://image.shutterstock.com/image-vector/pagination-bars-web-buttons-vector-260nw-1111694900.jpg"
					alt="Product"
				/>
			</div>
			<span>{product.title}</span>
			<span>{dateString.toString()}</span>
		</div>
	);
};

export default SaleCard;
