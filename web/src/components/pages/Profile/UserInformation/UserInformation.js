import React from "react";

import "./UserInformation.scss";
import UserIcon from "../../../icons/UserIcon";

const UserInformation = ({ user: { iconName, fullName, location } = {} }) => {

	return (
		<div className="user-information">
			<UserIcon
				className="user-information-icon"
				src={iconName}
				fullName={fullName}
			/>

			<span className="user-information-fullname">{fullName}</span>
			<span className="user-information-location">{location?.name}</span>
		</div>
	);
};

export default UserInformation;
