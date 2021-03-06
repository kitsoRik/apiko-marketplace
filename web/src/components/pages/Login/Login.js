import React, { useState } from "react";

import "./Login.scss";
import TextField from "../../layouts/TextField";
import Label from "../../layouts/Label";
import Button from "../../layouts/Button";
import { Link } from "react-router-dom";
import LoginForm from "../../layouts/LoginForm";
import LoginUpperContainer from "../../layouts/LoginForm/LoginUpperContainer";
import LoginLowerContainer from "../../layouts/LoginForm/LoginLowerContainer";
import LoginUpperContainerTitle from "../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainerTitle";

import { checkValidEmail } from "../../../services/checkers/checkers";
import withLoginedLock from "../../hocs/withLoginedLock";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../../../apollo/queries/user-queries";
import { socketReconnect } from "../../../apollo";

const Login = ({ history }) => {
	const [error, setError] = useState(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const apolloClient = useApolloClient();
	const [login, { loading }] = useMutation(LOGIN_MUTATION);

	const _login = () =>
		login({
			variables: {
				email,
				password,
			},
		})
			.then(async ({ data: { login } }) => {
				await apolloClient.cache.reset();
				socketReconnect();
				apolloClient.writeQuery({
					query: CURRENT_USER_QUERY,
					data: {
						currentUser: login,
					},
				});

				history.push("/");
			})
			.catch((error) => setError(textFromError(error)));

	const allowSubmit = () => {
		return checkValidEmail(email) && password;
	};

	return (
		<div className="login-page">
			<LoginForm
				loading={loading}
				onSubmit={(e) => e.preventDefault()}
			>
				<LoginUpperContainer>
					<LoginUpperContainerTitle>
						Login
					</LoginUpperContainerTitle>
					{error && <Label error={true} value={error} />}
					<Label
						className="login-page-form-field"
						value="Email"
						errorValueIfTouched={
							!checkValidEmail(email)
								? "Email is not valid"
								: null
						}
					>
						<TextField
							value={email}
							errorIfTouched={!checkValidEmail(email)}
							placeholder={"Example@gmail.com"}
							onValueChange={(value) => setEmail(value)}
						/>
					</Label>
					<Label
						className="login-page-form-field"
						value="Password"
						errorValueIfTouched={
							!password ? "Password is required" : null
						}
					>
						<TextField
							value={password}
							password={true}
							errorIfTouched={!password}
							onValueChange={(value) => setPassword(value)}
						/>
					</Label>
					<Link
						className="login-page-forgot-label"
						to="/forgot-password"
					>
						Don't remeber password?
					</Link>
					<Button.Default
						disabled={!allowSubmit()}
						onClick={_login}
						value="Continue"
					/>
				</LoginUpperContainer>
				<LoginLowerContainer>
					I have no account,&nbsp;
					<span className="login-page-link">
						<Link to="/register">REGISTER NOW</Link>
					</span>
				</LoginLowerContainer>
			</LoginForm>
		</div>
	);
};

const textFromError = (error) => {
	switch (error?.message.substring(15)) {
		case "EMAIL_IS_REQUIRED":
			return "Email is required";
		case "PASSWORD_IS_REQUIRED":
			return "Password is required";
		case "EMAIL_IS_NOT_VALID":
			return "Email is not valid";
		case "UNKNOWN_DATA":
			return "Unknown data, please check email and password";
		default:
			return "Unknown error";
	}
};

export default withLoginedLock(false)(Login);

const LOGIN_MUTATION = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			id
			fullName
			email
			iconName
		}
	}
`;
