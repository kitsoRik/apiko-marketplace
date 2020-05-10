import React from 'react';

import "./PaymentCard.scss";

const PaymentCard = ({ active, onSelect, title, children, icon }) => {
    return (
        <div className="payment-card" active={active ? "true" : null} onClick={onSelect}>
            <h4 className="payment-card-title">{title}</h4>
            <div className="payment-card-icon">
                {icon}
            </div>
            {!icon && children}
        </div>
    )
};

export default PaymentCard;