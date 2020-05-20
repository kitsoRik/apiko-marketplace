import React, { useState, useEffect } from "react";

import "./Snackbar.scss";
import SnackbarNotification from "./SnackbarNotification";

let _notifications = [];

const Snackbar = () => {
	const [notifications, setNotification] = useState([]);

	useEffect(() => {
		notifyAny = (next) =>
			new Promise((resolve, reject) => {
				const old = _notifications.find((n) => n.id === next.id);
				if (old) {
					clearTimeout(old.timeout);
				}
				const timeout = setTimeout(() => {
					setNotification(
						(_notifications = _notifications.filter(
							(n) => n.id !== next.id
						))
					);
					resolve();
				}, 4000);
				setNotification(
					(_notifications = [
						..._notifications.filter((n) => n.id !== next.id),
						{ ...next, timeout },
					])
				);
			});

		notifyInfo = (value, id) =>
			notifyAny({ id: id ?? notifyId++, type: "info", value });
		notifyWarning = (value, id) =>
			notifyAny({ id: id ?? notifyId++, type: "warning", value });
		notifyError = (value, id) =>
			notifyAny({ id: id ?? notifyId++, type: "error", value });

		notifyWithType = (type, value) => {
			switch (type) {
				case "info":
					return notifyInfo(value);
				case "warning":
					return notifyWarning(value);
				case "error":
					return notifyError(value);
				default:
					throw new Error("Unknown type for notify");
			}
		};
	}, []); // eslint-disable-line

	return (
		<div className="snackbar">
			{notifications.map(({ id, type, value }) => (
				<SnackbarNotification key={id} type={type} value={value} />
			))}
		</div>
	);
};

let notifyId = 1;

let notifyAny = (next) => {};

export let notifyInfo = (value, id) => {};
export let notifyWarning = (value, id) => {};
export let notifyError = (value, id) => {};

export let notifyWithType = (type, value) => {};

export default Snackbar;
