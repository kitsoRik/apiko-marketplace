import React from "react";

import "./CartProductsListItem.scss";
import ProductIcon from "../../../icons/ProductIcon";

const CartProductsListItem = ({
	editable,
	onCountChange,
	cartProduct: {
		count,
		product: { title, imageName, price },
	},
}) => {
	return (
		<div className="cart-products-list-item">
			<div className="cart-products-list-item-image">
				<ProductIcon imageName={imageName} />
			</div>
			<div className="cart-products-list-item-info">
				<div className="cart-products-list-item-info-title">
					<h4>{title}</h4>
				</div>
				<div className="cart-products-list-item-info-headers">
					<span className="cart-products-list-item-info-headers-price">
						Price
					</span>
					<span className="cart-products-list-item-info-headers-count">
						Count
					</span>
					<span className="cart-products-list-item-info-headers-total">
						Total sum
					</span>
				</div>
				<div className="cart-products-list-item-info-price-container">
					<span className="cart-products-list-item-info-price-container-price">
						{price}$
					</span>
					<div className="cart-products-list-item-info-price-container-counter">
						{editable && (
							<button
								className="cart-products-list-item-info-price-container-counter-button"
								onClick={() => onCountChange(count - 1)}
								disabled={count === 1}
							>
								-
							</button>
						)}
						<span>{count}</span>
						{editable && (
							<button
								className="cart-products-list-item-info-price-container-counter-button"
								onClick={() => onCountChange(count + 1)}
							>
								+
							</button>
						)}
					</div>
					<div className="cart-products-list-item-info-price-container-total">
						<span>{count * price}$</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartProductsListItem;
