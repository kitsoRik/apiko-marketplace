import React, { useState } from "react";

import "./Purchase.scss";
import PaymentMethods from "./PaymentMethods/PaymentMethods";
import DeliveryAddress from "./DeliveryAddress/DeliveryAddress";
import OrderList from "./OrderList/OrderList";
import Checkout from "./Checkout/Checkout";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CURRENT_USER_CART_QUERY } from "../../../apollo/queries/user-queries";
import { PRODUCT_QUERY } from "../../../apollo/queries/products-queries";
import {
	PURCHASE_MUTATION,
	PURCHASE_MUTATION_WITH_CLEAR_CARD,
} from "../../../apollo/mutation/products-mutation";
import { useHistory, Link } from "react-router-dom";
import useLocationQuery from "react-use-location-query";
import ModalLoading from "../../layouts/ModalLoading/ModalLoading";
import Button from "../../layouts/Button";

const Purchase = ({ match, location: { search } }, fromCart = true) => {
	const {
		query: { cart, product, count },
		setQuery,
	} = useLocationQuery(
		{
			cart: false,
			product: "",
			count: 0,
		},
		{ parseNumber: true, parseBoolean: true }
	);

	const history = useHistory();

	const [mayPurchase, setMayPurchase] = useState(false);

	const currentUserCart = useQuery(CURRENT_USER_CART_QUERY, { skip: !cart });
	const productQuery = useQuery(PRODUCT_QUERY, {
		variables: { id: product },
		skip: !!cart && !!product,
	});

	const [purchase, purchaseMutation] = useMutation(PURCHASE_MUTATION);
	const [purchaseWithClearCart, purchaseWithClearCartMutation] = useMutation(
		PURCHASE_MUTATION_WITH_CLEAR_CARD
	);

	if (!cart && !product)
		return (
			<div>
				<h1>
					Please, select <Link to="/">product</Link> or{" "}
					<Button.Default
						onClick={() => setQuery({ cart: true })}
						value="cart"
					/>
				</h1>
			</div>
		);

	if (currentUserCart.loading || productQuery.loading)
		return <span>Loading...</span>;

	if (!cart && !productQuery?.data) {
		return <span>Unknown product</span>;
	}

	const cartProducts =
		(cart
			? currentUserCart?.data?.currentUser.cartProducts
			: [{ count: +count, product: productQuery.data.product }]) ?? [];

	const onPurchase = async () => {
		let purchases = [];

		if (!!cart) {
			purchases = cartProducts.map((c) => ({
				productId: c.product.id,
				count: +c.count,
			}));
		} else {
			purchases = [
				{
					productId: product,
					count: +count,
				},
			];
		}

		const purch = cart ? purchaseWithClearCart : purchase;

		await purch({
			variables: {
				purchases,
			},
		});

		history.push("/purchases?side=shopper");
	};

	return (
		<div className="purchase-page">
			<div className="purchase-page-right">
				<DeliveryAddress setMayPurchase={setMayPurchase} />
				<PaymentMethods />
				<OrderList cartProducts={cartProducts} />
			</div>
			<div className="purchase-page-left">
				<Checkout
					mayPurchase={mayPurchase}
					totalSum={cartProducts
						.map((c) => c.product.price * c.count)
						.reduce((p, c) => p + c, 0)}
					onPurchase={onPurchase}
				/>
			</div>
			{(cart
				? purchaseWithClearCartMutation.loading
				: purchaseMutation.loading) && <ModalLoading />}
		</div>
	);
};

export default Purchase;
