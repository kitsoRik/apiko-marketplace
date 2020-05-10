import React from 'react';

import "./DeliveryAddress.scss";
import Label from '../../../layouts/Label/Label';
import TextField from '../../../layouts/TextField/TextField';

const DeliveryAddress = () => {
    return (
        <div className="purchase-page-delivery-address">
            <Label value="City">
                <TextField />
            </Label>
            <Label value="Address">
                <TextField />
            </Label>
            <Label value="Post">
                <TextField />
            </Label>
        </div>
    )
};

export default DeliveryAddress;