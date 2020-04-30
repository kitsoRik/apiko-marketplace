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

const AddProduct = ({ history }) => {

    const [title, setTitle] = useState("");
    const [locationId, setLocationId] = useState(-1);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [photos, setPhotos] = useState([]);

    const onSubmit = () => {
        api.addProduct(title, locationId, description, photos, price)
            .then(({ success, result, error }) => {
                if (success) {
                    history.push(`/products/${result.id}`);
                } else {

                }
            })
    }

    return (
        <div className="add-product-page">
            <Form className="add-product-page-form">
                <h1 className="add-product-page-form-title">Add product</h1>
                <Label value="Title">
                    <TextField value={title} onChange={setTitle} placeholder="For example: Iron man suite" />
                </Label>
                <Label value="Location">
                    <LocationTextField onChange={setLocationId} placeholder="For example: Los Angele, CA" />
                </Label>
                <Label value="Description">
                    <TextField
                        multiline={true}
                        style={{ height: "180px" }}
                        value={description}
                        onChange={setDescription}
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
                    <TextField value={price} onChange={setPrice} placeholder="4.99$" className="add-product-page-form-price-field" />
                </Label>
                <Button.Default style={{ textTransform: 'uppercase' }} value="Submit" onClick={onSubmit} />
            </Form>
        </div>
    )
};

export default compose(
    withLoginedLock(true),
    connect()
)(AddProduct);