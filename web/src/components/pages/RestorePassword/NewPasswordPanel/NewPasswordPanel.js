import React, { useState } from "react";

import LoginForm from "../../../layouts/LoginForm/LoginForm";
import "./NewPasswordPanel.scss";
import LoginUpperContainer from "../../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainer";
import LoginUpperContainerTitle from "../../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainerTitle/LoginUpperContainerTitle";
import TextField from "../../../layouts/TextField/TextField";
import Label from "../../../layouts/Label/Label";
import Button from "../../../layouts/Button";
import Checkbox from "../../../layouts/Checkbox/Checkbox";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const NewPasswordPanel = ({ restoreKey }) => {
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
	const [leaveDevices, setLeaveDevices] = useState(true);

	const allowSubmit =
		!checkPasswordValid(password) &&
		!checkPasswordAgainValid(password, passwordAgain);

	const [restorePassword, { data, loading, error }] = useMutation(
		RESTORE_PASSWORD_MUTATION,
		{
			variables: { key: restoreKey, password, leaveDevices },
		}
	);

	const unrestoredPanel = (
		<LoginForm loading={loading} onSubmit={(e) => e.preventDefault()}>
			<LoginUpperContainer>
				<LoginUpperContainerTitle className="new-password-panel-title">
					Restore password
				</LoginUpperContainerTitle>
				{error && <Label error="true" value={error} />}
				<Label
					value="New password"
					errorValueIfTouched={checkPasswordValid(password)}
				>
					<TextField
						value={password}
						password="true"
						errorIfTouched={checkPasswordValid(password)}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Label>
				<Label
					className="new-password-panel-again-label"
					value="New password again"
					errorValueIfTouched={checkPasswordAgainValid(
						password,
						passwordAgain
					)}
				>
					<TextField
						value={passwordAgain}
						password="true"
						errorIfTouched={checkPasswordAgainValid(
							password,
							passwordAgain
						)}
						onChange={(e) => setPasswordAgain(e.target.value)}
					/>
				</Label>
				<Checkbox
					className="new-password-panel-leave-devices-checkbox"
					checked={leaveDevices}
					onChange={(e) => setLeaveDevices(e.target.checked)}
					value="Go out in all devices"
				/>
				<Button.Default
					disabled={!allowSubmit}
					onClick={restorePassword}
					value="Continue"
				/>
			</LoginUpperContainer>
		</LoginForm>
	);
	const restoredPanel = (
		<LoginForm onSubmit={(e) => e.preventDefault()}>
			<LoginUpperContainer>
				<LoginUpperContainerTitle>
					Password has restored
				</LoginUpperContainerTitle>
				<Label>Hey, your password has restored</Label>
			</LoginUpperContainer>
		</LoginForm>
	);

	return (
		<div className="new-password-panel">
			{!data?.restorePassword && unrestoredPanel}
			{data?.restorePassword && restoredPanel}
		</div>
	);
};

function checkPasswordValid(pass) {
	if (typeof pass !== "string") throw new Error("It is not a string");
	if (pass.length < 8) return "Length must be greater or equal eight";

	return null;
}

function checkPasswordAgainValid(pass, again) {
	return checkPasswordValid(pass) || pass !== again
		? "Password not equal password again"
		: null;
}
export default NewPasswordPanel;

const RESTORE_PASSWORD_MUTATION = gql`
	mutation restorePassword($key: String!, $password: String!, $leaveDevices: Boolean = false) {
		restorePassword(key: $key, password: $password, leaveDevices: $leaveDevices)
	}
`;
