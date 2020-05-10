import React from 'react';

import "./Checkout.scss";
import Button from '../../../layouts/Button';

const Checkout = () => {
    return (
        <div className="purchase-page-checkout">
            <span className="purchase-page-checkout-total">Total</span>
                <span className="purchase-page-checkout-to-pay">To pay: 136.3$</span>
            <Button.Default className="purchase-page-checkout-purchase-button" value="Purchase" />
        </div>
    )
};

export default Checkout;