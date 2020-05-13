import React, { useState } from 'react';

import "./AddProduct.scss";
import withLoginedLock from '../../hocs/withLoginedLock';

import Form from '../../layouts/Form';
import Label from '../../layouts/Label';
import TextField from '../../layouts/TextField';
import Button from '../../layouts/Button';
import InputImage from '../../layouts/Input/InputImage';
import LocationTextField from '../../other/LocationTextField/LocationTextField';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';

import _ from 'lodash';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import Combobox from '../../layouts/Combobox/Combobox';
import ComboboxOption from '../../layouts/Combobox/ComboboxOption/ComboboxOption';
import CategoryIcon from '../../icons/CategoryIcon/CategoryIcon';

const AddProduct = ({ history }) => {


    const [addProduct] = useMutation(ADD_PRODUCT_MUTATION)

    const onSubmit = ({ title, locationId, description, price, category, photos }, { setSubmitting, setErrors }) => {

        setSubmitting(true);
        addProduct({
            variables: {
                title,
                locationId,
                description,
                price: +price,
                category,
                photos: photos
            }
        }).then(({ data: { addProduct: { id } } }) => {
            setSubmitting(false);
            history.push(`/products/${id}`)
        });

    }

    const initialValue = {
        title: "",
        category: "any",
        locationId: -1,
        description: "",
        price: "",
        photos: []
    }

    const validate = ({ title, locationId, category, description, price, photos }) => {
        let errors = {};

        if (title === "") errors.title = "Title must be";
        if (locationId === -1) errors.locationId = "Location";

        if (price === "") errors.price = "Price must be"

        if (category === "any") errors.category = "Category cannot be unselected";

        return errors;
    }

    return (
        <div className="add-product-page">
            <Formik
                initialValues={initialValue}
                validate={validate}
                onSubmit={onSubmit}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched
                    }) => (
                            <Form className="add-product-page-form" onSubmit={e => e.preventDefault()}>
                                <h1 className="add-product-page-form-title">Add product</h1>
                                <Label value="Title" error={touched.title && errors.title}>
                                    <TextField error={touched.title && errors.title} value={values.title} onChange={handleChange} onBlur={handleBlur} name="title" placeholder="For example: Iron man suite" />
                                </Label>
                                <Label value="Location" error={touched.locationId && errors.locationId}>
                                    <LocationTextField
                                        error={touched.locationId && errors.locationId}
                                        withIcon={false}
                                        onLocationIdChange={id => setFieldValue("locationId", id)}
                                        onBlur={() => setFieldTouched("locationId", true)}
                                        placeholder="For example: Los Angele, CA" />
                                </Label>
                                <Label value="Description">
                                    <TextField
                                        multiline={true}
                                        style={{ height: "180px" }}
                                        value={values.description}
                                        onValueChange={value => setFieldValue("description", value)}
                                        placeholder="For example: Iron man suite" />
                                </Label>
                                <Label value="Photos" className="add-product-page-form-photo">
                                    <div className="add-product-page-form-photos-container">
                                        {values.photos.map((photo, i) =>
                                            <InputImage key={i} file={photo}
                                                onlyView={true}
                                                onClear={() => setFieldValue('photos', values.photos.filter(p => p !== photo))} />)}
                                        <InputImage multiple={true}
                                            setFiles={phs => setFieldValue('photos', values.photos.concat(phs))} />
                                    </div>
                                </Label>
                                <Label value="Category" error={touched.category && errors.category}>
                                    <Combobox type="medium"
                                        value={values.category}
                                        onBlur={() => setFieldTouched("category", true)}
                                        onChange={category => setFieldValue("category", category)} >
                                        <ComboboxOption icon={<CategoryIcon />} value="any">Choose category</ComboboxOption>
                                        <ComboboxOption value="mebels">Mebels</ComboboxOption>
                                        <ComboboxOption value="technology">Technology</ComboboxOption>
                                    </Combobox>
                                </Label>
                                <Label value="Price" error={touched.price && errors.price}>
                                    <TextField
                                        value={values.price}
                                        onChange={handleChange}
                                        name="price"
                                        onBlur={handleBlur}
                                        placeholder="4.99$" className="add-product-page-form-price-field" />
                                </Label>
                                <Button.Default disabled={!_.isEmpty(errors) || _.isEmpty(touched)} style={{ textTransform: 'uppercase' }} value="Submit" onClick={handleSubmit} />
                                {isSubmitting && <ModalLoading />}
                            </Form>
                        )
                }
            </Formik>
        </div>
    )
};

export default withLoginedLock(true)(AddProduct);



const ADD_PRODUCT_MUTATION = gql`
  mutation addProduct($title: String!, $description: String!, $locationId: ID!, $price: Float!, $category: String! $photos: [Upload!]){
    addProduct(title: $title, locationId: $locationId, description: $description, price: $price, category: $category, photos: $photos) {
            id
        }
    }
`;