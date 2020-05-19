import React, { useState, useEffect } from "react";

import "./EditProfile.scss";
import Form from "../../layouts/Form";
import UserIcon from "../../icons/UserIcon";
import Label from "../../layouts/Label";
import LocationTextField from "../../other/LocationTextField";
import TextField from "../../layouts/TextField";
import Button from "../../layouts/Button";
import ModalLoading from "../../layouts/ModalLoading/ModalLoading";
import withLoginedLock from "../../hocs/withLoginedLock";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Formik } from "formik";
import useCurrentUser from "../../hooks/useCurrentUser/useCurrentUser";

const EditProfile = () => {
	const { currentUser } = useCurrentUser();
	const [saveUser] = useMutation(SAVE_MUTATION);

	const [imageData, setImageData] = useState(null);
	const [image, setImage] = useState(null);

	useEffect(() => {
		setImage(currentUser.iconName);
		setImageData(null);
	}, [currentUser]);

	const inputImageRef = React.createRef();

	const onImageChange = (e) => {
		const file = e.target.files[0];

		if (!file) return;

		let reader = new FileReader();

		reader.onload = (event) => {
			setImage(event.target.result);
		};

		setImageData(file);
		reader.readAsDataURL(file);
	};

	const initialValues = {
		email: currentUser.email,
		fullName: currentUser.fullName,
		phone: currentUser.phone,
		locationId: currentUser.location?.id ?? -1,
	};

	const validate = ({ fullName, phone }) => {
		const errors = {};
		if (fullName.length < 3) errors.fullName = "Fullname must be";

		if (!/^\+\d{12}$/.test(phone)) errors.phone = "Bad phone";

		return errors;
	};

	const onSubmit = async (values, { setSubmitting }) => {
		setSubmitting(true);
		await saveUser({
			variables: {
				...values,
				icon: imageData,
			},
		});
		setSubmitting(false);
	};
	return (
		<div className="edit-profile-page">
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validate={validate}
			>
				{({
					values,
					errors,
					touched,
					setFieldValue,
					setFieldTouched,
					handleSubmit,
					isSubmitting
				}) => (
						<Form
							className="edit-profile-page-form"
							onSubmit={handleSubmit}
							asForm={true}
						>
							<h2 className="edit-profile-page-form-title">
								Edit profile
						</h2>
							<div className="edit-profile-page-form-icon">
								<UserIcon
									fullName={currentUser.fullName}
									src={image}
									local={!!imageData}
								/>
								<Button.Outlined
									type="outlined"
									value="Upgrade Photo"
									onClick={(e) => {
										e.preventDefault();
										inputImageRef.current.click();
									}}
								/>
								<input
									type="file"
									ref={inputImageRef}
									style={{ display: "none" }}
									onChange={onImageChange}
								/>
							</div>
							<div className="edit-profile-page-form-fields">
								<Label
									className="edit-profile-page-form-fields-full-email"
									value="Email"
								>
									<TextField
										value={values.email}
										disabled={true}
										onValueChange={(value) =>
											setFieldValue("email", value)
										}
									/>
								</Label>
								<Label
									className="edit-profile-page-form-fields-full-name"
									value="Full name"
									error={errors.fullName}
								>
									<TextField
										value={values.fullName}
										error={errors.fullName}
										onValueChange={(value) =>
											setFieldValue("fullName", value)
										}
									/>
								</Label>
								<Label
									className="edit-profile-page-form-fields-phone"
									value="Phone number"
									error={errors.phone}
								>
									<TextField
										value={values.phone}
										onValueChange={(value) => {
											setFieldTouched("phone", true)
											setFieldValue("phone", value)
										}}
										onBlur={() =>
											setFieldTouched("phone", true)
										}
									/>
								</Label>
								<Label
									className="edit-profile-page-form-fields-location"
									value="Location"
									error={errors.locationId}
								>
									<LocationTextField
										locationId={values.locationId}
										error={errors.locationId}
										initialLocationName={
											currentUser.location?.name
										}
										onLocationIdChange={(value) => {
											setFieldValue("locationId", value);
											setFieldTouched("locationId", true)
										}}
										onBlur={() =>
											setFieldTouched("locationId", true)
										}
									/>
								</Label>
							</div>
							<Button.Default
								className="edit-profile-page-form-save"
								type="submit"
								value="Save"
								disabled={
									(Object.keys(errors).length !== 0 ||
										Object.keys(touched).length === 0 ||
										JSON.stringify(values) ===
										JSON.stringify(initialValues)) &&
									!imageData
								}
							/>
							{(isSubmitting) && (
								<ModalLoading style={{ top: 0, left: 0 }} />
							)}
						</Form>
					)}
			</Formik>
		</div>
	);
};

export default withLoginedLock()(EditProfile);

const SAVE_MUTATION = gql`
	mutation saveUser(
		$fullName: String!
		$phone: String!
		$locationId: ID!
		$icon: Upload
	) {
		saveUser(
			fullName: $fullName
			locationId: $locationId
			phone: $phone
			icon: $icon
		) {
			id
			fullName
			iconName
			email
			location {
				id
				name
				latitude
				longitude
			}
		}
	}
`;
