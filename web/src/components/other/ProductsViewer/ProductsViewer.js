import React from "react";

import "./ProductsViewer.scss";
import ProductCard from "../../layouts/ProductCard/ProductCard";
import ModalLoading from "../../layouts/ModalLoading/ModalLoading";
import ArrowByCircleIcon from "../../icons/ArrowByCircleIcon/ArrowByCircleIcon";

const ProductsViewer = ({ visibleLoad, onLoadMore, products, loading, joinLoading = true }) => {
	return (
		<div className="products-viewer">
			{(!loading || joinLoading) && products?.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
			{visibleLoad && !loading && (
				<div
					className="products-viewer-load product-card"
					onClick={onLoadMore}
				>
					<ArrowByCircleIcon />
				</div>
			)}
			{products.length !== 0 && joinLoading && loading && (
				<div
					className="products-viewer-load product-card"
				><ModalLoading
						darken={false}
						style={{ gridColumn: joinLoading ? "1 / span 1" : "1 / span 4", position: "static" }}
					/>
				</div>
			)}
			{loading && (
				<ModalLoading
					darken={false}
					style={{ gridColumn: (joinLoading && products.length !== 0) ? "1 / span 1" : "1 / span 4", position: "static" }}
				/>
			)}
			{!loading && products?.length === 0 && (
				<span>Products is empty</span>
			)}
		</div>
	);
};

export default ProductsViewer;
