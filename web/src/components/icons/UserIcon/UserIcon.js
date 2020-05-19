import React from "react";

import "./UserIcon.scss";
import { userIconBaseUrl } from "../../../services/api/api";
import ModalLoading from "../../layouts/ModalLoading/ModalLoading";
import { useHistory } from "react-router-dom";

const UserIcon = ({
	userId = "",
	src,
	fullName = "",
	className,
	local = false,
	loading,
	...props
}) => {
	const history = useHistory();
	const initials = fullName.split(" ").map((s) => s[0]);

	if (!src) {
		return (
			<div className={`user-icon ${className ?? ""}`} onClick={() => history.push(`/profile/${userId}`)} {...props}>
				<span style={{ background: "orange", color: "black" }}>
					{initials}
				</span>
				{loading && <ModalLoading darken={false} />}
			</div>
		);
	}

	return (
		<div className={`user-icon ${className ?? ""}`} onClick={() => history.push(`/profile/${userId}`)} {...props}>
			<img
				src={`${local ? "" : userIconBaseUrl}${src}`}
				alt="User icon"
			/>
		</div >
	);
};

export default UserIcon;
