import React, { useState } from "react";

import "./InputFeedback.scss";
import TextField from "../../../../layouts/TextField";
import Form from "../../../../layouts/Form";
import StarsInput from "../../../../layouts/StarsInput/StarsInput";
import Button from "../../../../layouts/Button";
import { useMutation } from "@apollo/react-hooks";
import { ADD_FEEDBACK_MTUTATIOn } from "../../../../../apollo/mutation/products-mutation";
import ModalDialog from "../../../../layouts/ModalDialog/ModalDialog";
import { notifyError } from "../../../../other/Snackbar/Snackbar";

const InputFeedback = ({ productId }) => {
	const [rate, setRate] = useState(0);
	const [text, setText] = useState("");

	let rateStr = "";

	switch (rate) {
		case 1:
			rateStr = "Very bad";
			break;
		case 2:
			rateStr = "Bad";
			break;
		case 3:
			rateStr = "Medium";
			break;
		case 4:
			rateStr = "Good";
			break;
		case 5:
			rateStr = "Very good";
			break;
		default:
			break;
	}

	const [addFeedback, { loading }] = useMutation(ADD_FEEDBACK_MTUTATIOn);

	const onSendFeedback = async () => {
		if (rate === 0) return notifyError("Rate cannot be a zero");
		if (text === "") return notifyError("Text cannot be is empty");

		await addFeedback({
			variables: {
				productId,
				rate,
				text,
			},
		});

		setRate(0);
		setText("");
	};

	return (
		<Form className="input-feedback">
			<div className="input-feedback-rate">
				<StarsInput onRateChange={setRate} rate={rate} />
				<span className="input-feedback-rate-text">{rateStr}</span>
			</div>
			<div className="input-feedback-inputs">
				<TextField value={text} onValueChange={setText} />
				<Button.Default onClick={onSendFeedback} value="Send" />
			</div>
			{loading && <ModalDialog />}
		</Form>
	);
};

export default InputFeedback;
