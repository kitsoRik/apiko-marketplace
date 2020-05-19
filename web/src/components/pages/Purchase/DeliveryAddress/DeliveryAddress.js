import React, { useState } from "react";

import "./DeliveryAddress.scss";
import Label from "../../../layouts/Label/Label";
import TextField from "../../../layouts/TextField/TextField";
import { Formik } from "formik";
import { isEmpty } from "lodash";

const initialValues = {
	city: "",
	address: "",
	post: "",
};

const validate = setMayPurchase => ({ city, address, post }) => {
	let errors = {};

	if (city === "") errors.city = "City cannot be is empty";

	if (address === "") errors.city = "Address cannot be is empty";

	if (post === "") errors.city = "Post code cannot be is empty";

	setMayPurchase(isEmpty(errors));

	return errors;
};

const DeliveryAddress = ({ setMayPurchase }) => {

	return (
		<Formik initialValues={initialValues} validate={validate(setMayPurchase)}>
			{({ values, setFieldValue }) => (
				<div className="purchase-page-delivery-address">
					<Label value="City">
						<TextField
							value={values.city}
							onValueChange={(value) =>
								setFieldValue("city", value)
							}
						/>
					</Label>
					<Label value="Address">
						<TextField
							value={values.address}
							onValueChange={(value) =>
								setFieldValue("address", value)
							}
						/>
					</Label>
					<Label value="Post">
						<TextField
							value={values.post}
							onValueChange={(value) =>
								setFieldValue("post", value)
							}
						/>
					</Label>
				</div>
			)}
		</Formik>
	);
};

export default DeliveryAddress;
