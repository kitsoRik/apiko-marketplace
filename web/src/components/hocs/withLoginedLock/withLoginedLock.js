import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { LOGINED, LOGINING, UNLOGINING } from "../../../constants/login";
import ModalLoading from "../../layouts/ModalLoading/ModalLoading";

import "./withLoginedLock.scss";
import { notifyError } from "../../other/Snackbar/Snackbar";
import { LOADING, LOADED, LOADED_ERROR, UNLOADED } from "../../../constants";
import { REGISTERED, REGISTERING } from "../../../constants/register";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../../../apollo/queries/user-queries";

const withLoginedLock = (needLogin = true) => (WrapperComponent) => {
	const HOC = (props) => {
		const { history, loginStatus, registerStatus } = props;

		const [checked, setChecked] = useState(false);

		const { data, loading } = useQuery(CURRENT_USER_QUERY);

		const loadingDataState = loading
			? LOADING
			: !!data && data.currentUser !== null
			? LOADED
			: LOADED_ERROR;
		const loadingVisible =
			(loadingDataState === LOADING &&
				registerStatus !== REGISTERING &&
				loginStatus !== LOGINING) ||
			loginStatus === UNLOGINING;
		const loadedWithoutLogin =
			loadingDataState === LOADED &&
			loginStatus !== LOGINED &&
			registerStatus !== REGISTERED;
		const dataNotLoaded =
			loadingDataState === LOADED_ERROR || loadingDataState === UNLOADED;

		useEffect(() => {
			if (loginStatus === UNLOGINING) {
				setChecked(false);
			}
		}, [loginStatus]);

		useEffect(() => {
			if (loadingDataState === LOADED_ERROR && checked) {
				setChecked(false);
				notifyError("Now, you have no access to this page");
				history.push("/");
			}
		}, [loadingDataState]);

		useEffect(() => {
			if (loadingVisible) setChecked(false);
			if (checked) return;
			if (
				(!needLogin && loadedWithoutLogin) ||
				(needLogin && dataNotLoaded)
			) {
				setChecked(true);
				notifyError("Access has blocked by login policy");
				history.push("/");
			} else if (loadedWithoutLogin || dataNotLoaded) {
				setChecked(true);
			}
		}, [loadingDataState]); // eslint-disable-line

		const wrapper = (
			<div
				className="with-logined-lock"
				loading={loadingVisible ? "true" : null}
			>
				{checked && <WrapperComponent {...props} />}
				{!checked && loadingVisible && <ModalLoading />}
			</div>
		);

		if (loadingVisible) {
			return wrapper;
		}

		return wrapper;
	};

	return compose(
		connect(({ user: { loginStatus, registerStatus } }) => ({
			loginStatus,
			registerStatus,
		}))
	)(HOC);
};

export default withLoginedLock;
