import React from 'react';

import "./SaleCard.scss";

const SaleCard = ({ id, product, user, date }) => {
    return (
        <div className="sale-card">
            <div className="sale-card-icon">
                <img src="https://image.shutterstock.com/image-vector/pagination-bars-web-buttons-vector-260nw-1111694900.jpg" alt="Product image"/>
            </div>
            <span>{ product.title }</span>
            <span>{ date.toString() }</span>
        </div>
    )
};

export default SaleCard;