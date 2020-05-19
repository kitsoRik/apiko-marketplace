import React from "react";

import "./CartProductsList.scss";
import CartProductsListItem from "./CartProductsListItem/CartProductsListItem";

const CartProductsList = ({
	onCountChange,
	editable = true,
	cartProducts = [],
}) => {
	return (
		<div className="card-products-list">
			{cartProducts.map((p) => (
				<CartProductsListItem
					key={p.product.id}
					onCountChange={(count) =>
						onCountChange(p.product.id, count)
					}
					editable={editable}
					cartProduct={p}
				/>
			))}
		</div>
	);
};

export default CartProductsList;
