import React, { useState } from 'react';

import "./PaymentMethods.scss";
import PaymentCard from './PaymentCard/PaymentCard';
import VisaIcon from '../../../icons/VisaIcon';

const PaymentMethods = () => {

    const [selectedMethodIndex, setSelectedMethodIndex] = useState(-1);

    return (
        <div className="purchase-page-payment-methods">
            <PaymentCard
                active={selectedMethodIndex === 0}
                onSelect={() => setSelectedMethodIndex(0)}
                title="Card" icon={<VisaIcon />} />
            <PaymentCard
                active={selectedMethodIndex === 1}
                onSelect={() => setSelectedMethodIndex(1)}
                title="C.O.D" />
        </div>
    )
};

export default PaymentMethods;