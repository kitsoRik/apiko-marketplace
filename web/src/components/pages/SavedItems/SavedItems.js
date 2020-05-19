import React, { useEffect, useState } from "react";

import "./SavedItems.scss";
import Form from "../../layouts/Form";
import ProductCard from "../../layouts/ProductCard/ProductCard";
import ModalLoading from "../../layouts/ModalLoading/ModalLoading";
import { useQuery } from "@apollo/react-hooks";
import { SAVED_PRODUCTS_QUERY } from "../../../apollo/queries/products-queries";
import withLoginedLock from "../../hocs/withLoginedLock";

const SavedItems = () => {
	const { data, loading } = useQuery(SAVED_PRODUCTS_QUERY);

	const [savedProducts, setSavedProducts] = useState([]);
	const [unSavedProducts, setUnSavedProducts] = useState([]);

	const onChangeSavedState = (product, saved) => {
		if (!saved) {
			setUnSavedProducts(unSavedProducts.concat([{ ...product, saved }]));
			setSavedProducts(savedProducts.filter((p) => p.id !== product.id));
		} else {
			setSavedProducts(savedProducts.concat([{ ...product, saved }]));
			setUnSavedProducts(
				unSavedProducts.filter((p) => p.id !== product.id)
			);
		}
	};

	useEffect(() => {
		if (data?.savedProducts) {
			const newSavedProducts = data.savedProducts;
			const savedProductsIds = savedProducts.map((p) => p.id);
			setSavedProducts(
				newSavedProducts
					.filter((p) => savedProductsIds.indexOf(p.id) === -1)
					.concat(savedProducts)
			);
		}
	}, [data]); // eslint-disable-line

	useEffect(() => {
		const usSavedProductsIds = unSavedProducts.map((p) => p.id);
		if (
			savedProducts.filter((p) => usSavedProductsIds.indexOf(p.id) !== -1)
				.length !== 0
		) {
			setSavedProducts(
				savedProducts.filter(
					(p) => usSavedProductsIds.indexOf(p.id) === -1
				)
			);
		}
	}, [savedProducts]); // eslint-disable-line

	useEffect(() => {
		const savedProductsIds = savedProducts.map((p) => p.id);
		if (
			unSavedProducts.filter((p) => savedProductsIds.indexOf(p.id) !== -1)
				.length !== 0
		) {
			setUnSavedProducts(
				unSavedProducts.filter(
					(p) => savedProductsIds.indexOf(p.id) === -1
				)
			);
		}
	}, [unSavedProducts]); // eslint-disable-line

	const bracketsContent = loading ? (
		<ModalLoading
			darken={false}
			className="saved-items-page-form-title-loading"
		/>
	) : (
		savedProducts.length
	);

	return (
		<div className="saved-items-page">
			<Form className="saved-items-page-form">
				<div>
					<h1 className="saved-items-page-form-title">
						{" "}
						Saved items ({bracketsContent})
					</h1>
					<div className="saved-items-page-form-products-container">
						{savedProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onChangeSavedState={(state) =>
									onChangeSavedState(product, state)
								}
							/>
						))}
					</div>
				</div>
				{unSavedProducts?.length !== 0 && (
					<div>
						<h1 className="saved-items-page-form-title">
							{" "}
							Unsaved items ({unSavedProducts.length})
						</h1>
						<div className="saved-items-page-form-products-container">
							{unSavedProducts?.map((product) => (
								<ProductCard
									key={"_" + product.id}
									product={product}
									onChangeSavedState={(state) =>
										onChangeSavedState(product, state)
									}
								/>
							))}
						</div>
					</div>
				)}
			</Form>
		</div>
	);
};

export default withLoginedLock(true)(SavedItems);
