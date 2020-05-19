import React from "react";

import "./Checkout.scss";
import Button from "../../../layouts/Button";

const Checkout = ({ mayPurchase, totalSum, onPurchase }) => {
	return (
		<div className="purchase-page-checkout">
			<span className="purchase-page-checkout-total">Total</span>
			<span className="purchase-page-checkout-to-pay">
				To pay: {totalSum}$
			</span>
			<Button.Default
				className="purchase-page-checkout-purchase-button"
				value="Purchase"
				disabled={!mayPurchase}
				onClick={onPurchase}
			/>
		</div>
	);
};

export default Checkout;
