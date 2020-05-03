import React, { useState } from 'react';

import "./AddProduct.scss";
import { compose } from 'redux';
import withLoginedLock from '../../hocs/withLoginedLock';
import { connect } from 'react-redux';
import Form from '../../layouts/Form';
import Label from '../../layouts/Label';
import TextField from '../../layouts/TextField';
import Button from '../../layouts/Button';
import InputImage from '../../layouts/Input/InputImage';
import LocationTextField from '../../other/LocationTextField/LocationTextField';
import api from '../../../services/api';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const AddProduct = ({ history }) => {

    const [title, setTitle] = useState("");
    const [locationId, setLocationId] = useState(-1);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [photos, setPhotos] = useState([]);

    const [addProduct] = useMutation(ADD_PRODUCT_MUTATION)

    const onSubmit = () => {

        addProduct({
            variables: {
                title,
                locationId,
                description,
                price: +price,
                category: "any",
                photos: photos
            }
        }).then(({ data: { addProduct: { id } } }) => history.push(`/products/${id}`));

    }

    return (
        <div className="add-product-page">
            <Form className="add-product-page-form">
                <h1 className="add-product-page-form-title">Add product</h1>
                <Label value="Title">
                    <TextField value={title} onValueChange={setTitle} placeholder="For example: Iron man suite" />
                </Label>
                <Label value="Location">
                    <LocationTextField onLocationIdChange={setLocationId} placeholder="For example: Los Angele, CA" />
                </Label>
                <Label value="Description">
                    <TextField
                        multiline={true}
                        style={{ height: "180px" }}
                        value={description}
                        onValueChange={setDescription}
                        placeholder="For example: Iron man suite" />
                </Label>
                <Label value="Photos" className="add-product-page-form-photo">
                    <div className="add-product-page-form-photos-container">
                        {photos && photos.map((photo, i) =>
                            <InputImage key={i} file={photo} onlyView={true}
                                onClear={() => setPhotos(photos.filter(p => p !== photo))} />)}
                        <InputImage multiple={true} setFiles={phs => setPhotos(photos.concat(phs))} />
                    </div>
                </Label>
                <Label value="Price">
                    <TextField value={price} onValueChange={setPrice} placeholder="4.99$" className="add-product-page-form-price-field" />
                </Label>
                <Button.Default style={{ textTransform: 'uppercase' }} value="Submit" onClick={onSubmit} />
            </Form>
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