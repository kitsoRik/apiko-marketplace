import React from "react";
import qs from "qs";

import "./RestorePassword.scss";
import NewPasswordPanel from "./NewPasswordPanel";
import ErrorKeyPanel from "./ErrorKeyPanel/ErrorKeyPanel";
import withLoginedLock from "../../hocs/withLoginedLock";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const RestorePassword = ({
	history: {
		location: { search = "?" },
	},
}) => {
	const { key } = qs.parse(search.slice(1));

	const { data, loading, error } = useQuery(CHECK_RESTORE_KEY, {
		variables: { key },
		errorPolicy: "all",
	});

	const typeError = error?.graphQLErrors[0]?.message;
	let stringError;
	switch (typeError) {
		case "KEY_IS_INVALID":
			stringError = "Key is not valid";
			break;
		default:
			stringError = "";
			break;
	}
	return (
		<div className="restore-password-page">
			{data?.restorePasswordCheckKey && (
				<NewPasswordPanel restoreKey={key} />
			)}
			{loading && <span>Checking key...</span>}
			{error && <ErrorKeyPanel error={stringError} />}
		</div>
	);
};

export default withLoginedLock(false)(RestorePassword);

const CHECK_RESTORE_KEY = gql`
	query checkRestoryKey($key: String!) {
		restorePasswordCheckKey(key: $key)
	}
`;
