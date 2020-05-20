import React from "react";
import LoginForm from "../../../layouts/LoginForm/LoginForm";
import LoginUpperContainer from "../../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainer";
import LoginUpperContainerTitle from "../../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainerTitle/LoginUpperContainerTitle";
import Label from "../../../layouts/Label";

const ErrorKeyPanel = ({ error }) => {
	return (
		<LoginForm>
			<LoginUpperContainer>
				<LoginUpperContainerTitle>
					Key error
				</LoginUpperContainerTitle>
				<Label value={`Reason: ${error}`} />
			</LoginUpperContainer>
		</LoginForm>
	);
};

export default ErrorKeyPanel;
