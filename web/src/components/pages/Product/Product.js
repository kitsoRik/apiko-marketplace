import React, { useState, useEffect } from 'react';

import "./Product.scss";
import Form from '../../layouts/Form';
import Button from '../../layouts/Button';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import HeartIcon from '../../icons/HeartIcon';
import UserIcon from '../../icons/UserIcon';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { PRODUCT_QUERY } from '../../../apollo/queries/products-queries';
import { notifyWarning } from '../../other/Snackbar/Snackbar';
import { CHANGE_SAVED_STATE_MUTATION } from '../../../apollo/mutation/products-mutation';
import { changeProductStateHandler } from '../../../apollo/handlers/products-handler';
import ContactSellerDialog from './ContactSellerDialog/ContactSellerDialog';
import { CURRENT_USER_QUERY } from '../../../apollo/queries/user-queries';
import ProductIcon from '../../icons/ProductIcon';
import ProductLocation from './ProductLocation/ProductLocation';
import BuyDialog from './BuyDialog/BuyDialog';
import FeedbacksContainer from './FeedbacksContainer/FeedbacksContainer';

const Product = ({ match, history }) => {
    const { id } = match.params;

    const [buyDialogVisible, setBuyDialogVisible] = useState(false);
    const [newFeedbacksListIds, setNewFeedbacksListIds] = useState([]);

    const { data, loading, error, subscribeToMore, } = useQuery(PRODUCT_QUERY, {
        variables: { id }
    });

    const currentUserQuery = useQuery(CURRENT_USER_QUERY);


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

    const onOpenContactSellerDialog = () => {
        history.push(`/products/${data?.product?.id}?chat=true`)
    }

    return (
        <div className="product-page">
            <div>
                <Form className="product-page-product">
                    <div className="product-page-product-image">
                        {!loading && <ProductIcon imageName={data?.product?.imageName} />}
                        <span className="product-page-product-image-price">{'\u00A0'}{data && '$' + data?.product?.price}</span>
                    </div>
                    <div className="product-page-product-info">
                        <div className="product-page-product-info-upper">
                            <span className="product-page-product-info-upper-title">
                                {!loading && data?.product?.title}
                            </span>
                            <span className="product-page-product-info-upper-time">
                                {!loading && parseTime(data?.product?.createdAt)}
                            </span>
                            <ProductLocation location={data?.product?.location} />
                        </div>
                        <div className="product-page-product-info-line"></div>
                        <span className="product-page-product-info-description">
                            {data?.product?.description}
                        </span>
                    </div>
                    {loading && <ModalLoading />}
                </Form>

                {!loading && data?.product?.photosNames.length !== 0 &&
                    <Form className="product-page-product-photos">
                        {data?.product?.photosNames.map(p => <ProductIcon key={p} imageName={p} />)}
                    </Form>
                }
                <FeedbacksContainer productId={id} />
            </div>
            <div className="product-page-user">
                <Form className="product-page-user-form">
                    <UserIcon src={data?.product?.owner.iconName}
                        fullName={data?.product?.owner.fullname}
                        className="product-page-user-form-icon" />
                    <span>{data?.product?.owner.fullName}{'\u00A0'}</span>
                    <span>{data?.product?.owner.fullName}{'\u00A0'}</span>
                    {loading && <ModalLoading fillPercent={70} style={{ marginTop: '-14px' }} />}
                </Form>
                {!loading && <div className="product-page-user-buttons">
                    {data?.product && currentUserQuery.data?.currentUser?.id !== data?.product?.owner.id &&
                        <Button.Default
                            className="product-page-user-buttons-chat-with-seller-button"
                            value="Chat with seller"
                            uppercase={true}
                            onClick={onOpenContactSellerDialog}
                        />}

                    {data?.product && currentUserQuery.data?.currentUser?.id !== data?.product?.owner.id &&
                        <Button.Default
                            className="product-page-user-buttons-chat-with-buy-button"
                            value="Buy"
                            uppercase="true"
                            onClick={() => setBuyDialogVisible(true)}
                        />}
                    <Button.Outlined
                        uppercase={true}
                        onClick={onChangeSavedState}
                        icon={<HeartIcon filed={data?.product?.saved} />}
                        className="product-page-user-buttons-add-to-favorite-button"
                        value={data?.product?.saved ? "Remove from favorites" : "Add to favorites"} />
                </div>}
            </div>
            <ContactSellerDialog
                productId={data?.product?.id}
                productTitle={data?.product?.title}
                fullName={data?.product?.owner.fullName}
                location={data?.product?.location.name}
                iconName={data?.product?.owner.iconName}
            />
            {data?.product && <BuyDialog product={data?.product} opened={buyDialogVisible} onClosed={() => setBuyDialogVisible(false)} />}
        </div>
    )
};

export default Product;

const parseTime = (str) => {
    let temp = new Date();
    const time = new Date(str);

    temp.setHours(0);
    temp.setMinutes(0);
    temp.setSeconds(0);

    const today = temp;

    if (time > today) {
        const h = time.getHours();
        const m = time.getMinutes();
        return `Today ${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
    }

    return `${time.getFullYear()}`;
}