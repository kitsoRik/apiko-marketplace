import React, { useState } from 'react';

import "./Product.scss";
import Form from '../../layouts/Form';
import Button from '../../layouts/Button';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import LocationIcon from '../../icons/LocationIcon';
import HeartIcon from '../../icons/HeartIcon';
import UserIcon from '../../icons/UserIcon';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { PRODUCT_QUERY } from '../../../apollo/queries/products-queries';
import api from '../../../services/api';
import { notifyWarning } from '../../other/Snackbar/Snackbar';
import { CHANGE_SAVED_STATE_MUTATION } from '../../../apollo/mutation/products-mutation';
import { changeProductStateHandler } from '../../../apollo/handlers/products-handler';
import ContactSellerDialog from './ContactSellerDialog/ContactSellerDialog';

const Product = ({ match }) => {

    const [opened, setOpened] = useState(false);

    const { id } = match.params;

    const { data, loading, error } = useQuery(PRODUCT_QUERY, {
        variables: { id }
    });


    const [changeState, changeStateRecord] = useMutation(CHANGE_SAVED_STATE_MUTATION, {
        optimisticResponse: {
            changeSavedStateOfProduct: !data?.product?.saved
        }
    });

    const onChangeSavedState = () => {
        if (changeStateRecord.loading) return notifyWarning("Wait before next saved.");
        const state = !data?.product?.saved;
        changeState({ variables: { id, state }, });
        changeProductStateHandler(data?.product, state);
    }

    return (
        <div className="product-page">
            <Form className="product-page-product">
                <div className="product-page-product-image">
                    <img src={`${api.productsImageBaseUrl}/${data?.product?.imageName}`} />
                    <span className="product-page-product-image-price">{'\u00A0'}{data && '$' + data?.product?.price}</span>
                </div>
                <div className="product-page-product-info">
                    <div className="product-page-product-info-upper">
                        <span className="product-page-product-info-upper-title">
                            {data?.product?.title}
                        </span>
                        <span className="product-page-product-info-upper-time">
                            {data?.product?.title}
                        </span>
                        <div className="product-page-product-info-upper-location">
                            <LocationIcon className="product-page-product-info-upper-location-icon" />
                            <span className="product-page-product-info-upper-location-text">
                                {data?.product?.location.name}
                            </span>
                        </div>
                    </div>
                    <div className="product-page-product-info-line"></div>
                    <div className="product-page-product-info-description">
                        {data?.product?.description}
                    </div>
                </div>
                {loading && <ModalLoading />}
            </Form>
            <div className="product-page-user">
                <Form className="product-page-user-form">
                    <UserIcon src={data?.product?.owner.iconName}
                        fullName={data?.product?.owner.fullname}
                        className="product-page-user-form-icon" />
                    <span>{data?.product?.owner.fullName}{'\u00A0'}</span>
                    <span>{data?.product?.owner.fullName}{'\u00A0'}</span>
                    {loading && <ModalLoading fillPercent={70} style={{ marginTop: '-14px' }} />}
                </Form>
                <Button.Default
                    className="product-page-user-chat-with-seller-button"
                    value="Chat with seller"
                    uppercase={true}
                    onClick={() => setOpened(true)}
                />
                <Button.Outlined
                    uppercase={true}
                    onClick={onChangeSavedState}
                    icon={<HeartIcon filed={data?.product?.saved} />}
                    className="product-page-user-add-to-favorite-button"
                    value={data?.product?.saved ? "Remove from favorites" : "Add to favorites"} />
            </div>
            <ContactSellerDialog
                opened={opened}
                setOpened={setOpened}
                productTitle={data?.product?.title}
                fullName={data?.product?.owner.fullName}
                location={data?.product?.location.name}
                iconName={data?.product?.owner.iconName}
            />
        </div>
    )
};

export default Product;

