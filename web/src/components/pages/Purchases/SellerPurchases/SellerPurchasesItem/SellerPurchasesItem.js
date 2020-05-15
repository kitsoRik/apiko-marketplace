import React from 'react';

import "./SellerPurchasesItem.scss";
import ProductIcon from '../../../../icons/ProductIcon';
import { useMutation } from '@apollo/react-hooks';
import { CHANGE_PURCHASE_STATUS } from '../../../../../apollo/mutation/purchases-mutations';
import { Link } from 'react-router-dom';

const SellerPurchasesItem = ({ id, product, statuses }) => {

    const [changePurchaseStatus] = useMutation(CHANGE_PURCHASE_STATUS);

    console.log(product);

    const onChangePurchaseStatus = async () => {
        await changePurchaseStatus({
            variables: { productId: product.id, status: "POSTED" }
        })
    }

    return (
        <Link className="seller-purchases-item" to={`/purchases/${id}`}>
            <div className="seller-purchases-item-product">
                <div className="seller-purchases-item-product-image">
                    <ProductIcon />
                </div>
                <div className="seller-purchases-item-product-info">
                    <span className="seller-purchases-item-product-info-title">{product.title}</span>
                    {/* <span className="seller-purchases-item-product-info-description">{product.description}</span> */}
                    <span className="seller-purchases-item-product-info-price">${product.price}</span>
                </div>
            </div>
            <div className="seller-purchases-item-status">
                <span>{statuses[statuses.length - 1].status}</span>
            </div>
        </Link>
    )
};

export default SellerPurchasesItem;