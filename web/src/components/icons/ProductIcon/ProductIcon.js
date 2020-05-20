import React from "react";

import "./ProductIcon.scss";
import api from "../../../services/api";
import ImageNoAvaiableIcon from "../ImageNoAvaliableIcon/ImageNoAvalaibleIcon";
import ModalLoading from "../../layouts/ModalLoading/ModalLoading";

const ProductIcon = ({ imageName, loading, ...props }) => {
	if (loading)
		return (
			<div className="product-icon" {...props}>
				<ModalLoading darken={false} />
			</div>
		);
	if (imageName) {
		return (
			<img
				src={`${api.productsImageBaseUrl}${imageName}`}
				alt="Product icon"
				{...props}
			/>
		);
	}
	return <ImageNoAvaiableIcon style={{ height: "80%", width: "100%" }} />;
};

export default ProductIcon;
