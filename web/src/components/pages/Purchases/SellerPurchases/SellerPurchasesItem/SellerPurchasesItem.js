import React from "react";

import "./SellerPurchasesItem.scss";
import ProductIcon from "../../../../icons/ProductIcon";
import { Link } from "react-router-dom";

const SellerPurchasesItem = ({ id, product, count, statuses }) => {
	return (
		<div className="seller-purchases-item">
			<div className="seller-purchases-item-product">
				<div className="seller-purchases-item-product-image">
					<ProductIcon
						style={{ maxWidth: "70px" }}
						imageName={product.imageName}
					/>
				</div>
				<div className="seller-purchases-item-product-info">
					<Link
						className="seller-purchases-item-product-info-title"
						to={`/purchases/${id}`}
					>
						{product.title}
					</Link>
					<span>Item price: ${product.price}</span>
					<span className="seller-purchases-item-product-info-price">
						Total price: ${product.price * count}
					</span>
				</div>
			</div>
			<div className="seller-purchases-item-status">
				<span>{statuses[statuses.length - 1].status}</span>
			</div>
		</div>
	);
};

export default SellerPurchasesItem;
