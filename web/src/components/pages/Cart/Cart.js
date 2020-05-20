import React, { useCallback } from "react";

import "./Cart.scss";
import Button from "../../layouts/Button";
import CartProductsList from "../../other/CartProductsList";
import { useQuery } from "@apollo/react-hooks";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import _ from "lodash";
import { CHANGE_CART_ITEM_COUNT } from "../../../apollo/mutation/user-mutation";
import { CURRENT_USER_CART_QUERY } from "../../../apollo/queries/user-queries";
import withLoginedLock from "../../hocs/withLoginedLock/withLoginedLock";
import ModalLoading from "../../layouts/ModalLoading/ModalLoading";

const Cart = () => {
	const { data, loading } = useQuery(CURRENT_USER_CART_QUERY);

	const client = useApolloClient();
	const [changeCartItemCount] = useMutation(CHANGE_CART_ITEM_COUNT);

	const mutateChangeCartItemCount = useCallback(
		_.debounce(async (id, nextCount) => {
			changeCartItemCount({
				variables: {
					productId: id,
					count: nextCount,
				},
				optimisticResponse: {
					changeCartItemCount: nextCount,
				},
			});
		}, 300),
		[]
	);

	const onCountChange = (id, nextCount) => {
		mutateChangeCartItemCount(id, nextCount);
		try {
			const data = client.readQuery({
				query: CURRENT_USER_CART_QUERY,
			});
			const newCartProducts = JSON.parse(
				JSON.stringify(data.currentUser.cartProducts)
			);
			newCartProducts.find(
				(cp) => cp.product.id === id
			).count = nextCount;
			client.writeQuery({
				query: CURRENT_USER_CART_QUERY,
				data: {
					...data,
					currentUser: {
						...data.currentUser,
						cartProducts: newCartProducts,
					},
				},
			});
		} catch (e) {}
	};
	if (loading)
		return (
			<div>
				<ModalLoading darken={false} />
			</div>
		);

	return (
		<div className="cart-page">
			<h1 className="cart-page-title">Cart</h1>
			{data.currentUser.cartProducts.length !== 0 && (
				<div className="cart-page-products">
					<CartProductsList
						cartProducts={data.currentUser.cartProducts}
						onCountChange={onCountChange}
					/>
				</div>
			)}
			{data.currentUser.cartProducts.length !== 0 && (
				<Button.Default
					className="cart-page-purchase-button"
					value="Purchase"
					asLink={true}
					to="/purchase?cart=true"
				/>
			)}
			{data.currentUser.cartProducts.length === 0 && (
				<h3 className="cart-page-empty">Your cart is empty</h3>
			)}
		</div>
	);
};

export default withLoginedLock(true)(Cart);
