import React from "react";
import "./ProductCard.scss";
import ModalLoading from "../ModalLoading/ModalLoading";
import HeartIcon from "../../icons/HeartIcon";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { notifyWarning } from "../../other/Snackbar/Snackbar";
import { CURRENT_USER_QUERY } from "../../../apollo/queries/user-queries";
import { CHANGE_SAVED_STATE_MUTATION } from "../../../apollo/mutation/products-mutation";
import { Link } from "react-router-dom";
import { changeProductStateHandler } from "../../../apollo/handlers/products-handler";
import ProductIcon from "../../icons/ProductIcon/ProductIcon";

const ProductCard = ({
	className,
	product,
	onChangeSavedState = () => {},
	...props
}) => {
	const {
		id,
		title,
		price,
		imageName,
		changingSaveState,
		saved = false,
	} = product;

	const { data } = useQuery(CURRENT_USER_QUERY);

	const [changeState, { loading }] = useMutation(
		CHANGE_SAVED_STATE_MUTATION,
		{
			optimisticResponse: {
				changeSavedStateOfProduct: {
					id,
					saved: !saved,
					__typename: "Product",
				},
			},
		}
	);

	const changeSavedState = () => {
		if (loading) return notifyWarning("Wait before next saved.");
		if (!data?.currentUser)
			return notifyWarning("Please, login before saving product.");
		const state = !saved;
		onChangeSavedState(state);
		changeState({ variables: { id, state } });
		changeProductStateHandler(product, state);
	};

	return (
		<div className={`product-card ${className ?? ""}`} {...props}>
			<div className="product-card-icon">
				<ProductIcon imageName={imageName} />
			</div>
			<div className="product-card-info">
				<Link
					className="product-card-info-title"
					to={`/products/${id}`}
				>
					{title}
				</Link>
				<span className="product-card-info-price">{price}</span>
			</div>
			<div className="product-card-like">
				<HeartIcon filed={saved} onClick={changeSavedState} />
				{changingSaveState && (
					<ModalLoading style={{ padding: "6px" }} />
				)}
			</div>
		</div>
	);
};

export default ProductCard;
