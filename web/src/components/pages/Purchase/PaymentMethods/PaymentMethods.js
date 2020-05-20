import React, { useState } from "react";

import "./PaymentMethods.scss";
import PaymentCard from "./PaymentCard/PaymentCard";
import VisaIcon from "../../../icons/VisaIcon";

const PaymentMethods = () => {
	// NOT REALIZED

	const [selectedMethodIndex, setSelectedMethodIndex] = useState(-1);
	return null;
	return (// eslint-disable-line
		<div className="purchase-page-payment-methods">
			<PaymentCard
				active={selectedMethodIndex === 0}
				onSelect={() => setSelectedMethodIndex(0)}
				title="Card"
				icon={<VisaIcon />}
			/>
			<PaymentCard
				active={selectedMethodIndex === 1}
				onSelect={() => setSelectedMethodIndex(1)}
				title="C.O.D"
			/>
		</div>
	);
};

export default PaymentMethods;
