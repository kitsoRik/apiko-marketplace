import React from "react";

import "./ShopperPurchasesItem.scss";
import ProductIcon from "../../../../icons/ProductIcon";
import { Link } from "react-router-dom";

const ShopperPurchasesItem = ({ id, product, count, statuses }) => {
	return (
		<div className="shopper-purchases-item">
			<div className="shopper-purchases-item-product">
				<div className="shopper-purchases-item-product-image">
					<ProductIcon
						style={{ maxWidth: "70px" }}
						imageName={product.imageName}
					/>
				</div>
				<div className="shopper-purchases-item-product-info">
					<Link
						className="shopper-purchases-item-product-info-title"
						to={`/purchases/${id}`}
					>
						{product.title}
					</Link>
					<span className="shopper-purchases-item-product-info-price">
						${product.price * count}
					</span>
				</div>
			</div>
			<div className="shopper-purchases-item-status">
				<span>{statuses[statuses.length - 1].status}</span>
			</div>
		</div>
	);
};

export default ShopperPurchasesItem;
