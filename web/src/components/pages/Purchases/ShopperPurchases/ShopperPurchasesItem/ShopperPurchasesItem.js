import React from 'react';

import "./ShopperPurchasesItem.scss";
import ProductIcon from '../../../../icons/ProductIcon';
import { Link } from 'react-router-dom';

const ShopperPurchasesItem = ({ id, product, count, statuses }) => {
    return (
        <Link className="shopper-purchases-item" to={`/purchases/${id}`}>
            <div className="shopper-purchases-item-product">
                <div className="shopper-purchases-item-product-image">
                    <ProductIcon />
                </div>
                <div className="shopper-purchases-item-product-info">
                    <span className="shopper-purchases-item-product-info-title">{product.title}</span>
                    {/* <span className="shopper-purchases-item-product-info-description">{product.description}</span> */}
                    <span className="shopper-purchases-item-product-info-price">${product.price * count}</span>
                </div>
            </div>
            <div className="shopper-purchases-item-status">
                <span>{statuses[statuses.length - 1].status}</span>
            </div>
        </Link>
    )
};

export default ShopperPurchasesItem;