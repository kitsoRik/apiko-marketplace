import React from "react";

import "./OrderList.scss";
import CartProductsList from "../../../other/CartProductsList";

const OrderList = ({ cartProducts }) => {
	return (
		<div className="purchase-page-order-list">
			<CartProductsList editable={false} cartProducts={cartProducts} />
		</div>
	);
};

export default OrderList;
