import React from "react";

import "./MobileHeaderMenu.scss";
import { LOGINING, UNLOGINING, LOGINED } from "../../../../../constants/login";
import { CURRENT_USER_QUERY } from "../../../../../apollo/queries/user-queries";
import { useQuery } from "@apollo/react-hooks";
import Button from "../../../../layouts/Button";
import { useHistory, Link } from "react-router-dom";
import ModalLoading from "../../../../layouts/ModalLoading/ModalLoading";
import UserPanel from "../../UserPanel/UserPanel";
import UserIcon from "../../../../icons/UserIcon";
import PostboxIcon from "../../../../icons/PostboxIcon/PostboxIcon";
import HeartIcon from "../../../../icons/HeartIcon";

const MobileHeaderMenu = ({ onClose }) => {
	const history = useHistory();
	const darkMode = !["/login", "/register"].find(
		(p) => p === history.location.pathname
	);
	const currentUserQuery = useQuery(CURRENT_USER_QUERY);
	const loginStatus = LOGINED; //FIX IT
	const visibleLoginButton =
		!currentUserQuery.loading && !currentUserQuery.data?.currentUser;
	const visibleUserIcon =
		!currentUserQuery.loading && currentUserQuery.data.currentUser;
	const visibleUserIconLoading =
		currentUserQuery.loading ||
		loginStatus === LOGINING ||
		loginStatus === UNLOGINING;

	const onSomeClick = (fn) => () => {
		onClose();
		if (fn) fn();
	};

	return (
		<div className="mobile-header-menu">
			<div className="mobile-header-menu-buttons">
				<Button.Outlined
					className="mobile-header-menu-buttons-sell"
					value="Sell"
					onClick={onSomeClick(() => history.push("/add-product"))}
				/>

				<Button.Outlined
					className="mobile-header-menu-buttons-inbox"
					value="Inbox"
					icon={<PostboxIcon darken={true} />}
					onClick={onSomeClick(() => history.push("/chats"))}
				/>

				<Button.Outlined
					className="mobile-header-menu-buttons-saved-items"
					value="Saved items"
					icon={
						<HeartIcon
							filed={history.location.pathname === "/saved-items"}
							color="#000"
							className="desktop-header-heart"
							dark-mode={true}
							width="24"
							height="24"
						/>
					}
					onClick={onSomeClick(() => history.push("/saved-items"))}
				/>
			</div>

			{visibleLoginButton && (
				<Button.Transparent
					className="mobile-header-menu-login-button"
					darkMode={darkMode ? "true" : null}
					value="Login"
					onClick={onSomeClick(() => history.push("/login"))}
				/>
			)}
			<div>
				{visibleUserIconLoading && (
					<div className="mobile-header-menu-profile" tabIndex={1}>
						{visibleUserIconLoading && (
							<ModalLoading
								style={{
									height: `48px`,
									width: `48px`,
									borderRadius: `50%`,
								}}
							/>
						)}
					</div>
				)}
				{visibleUserIcon && (
					<div className="mobile-header-menu-profile">
						<UserIcon
							fullName={
								currentUserQuery.data?.currentUser?.fullName
							}
							src={currentUserQuery.data?.currentUser?.iconName}
						/>
						<div className="mobile-header-menu-profile-info">
							<span className="mmobile-header-menu-profile-info-name">
								{currentUserQuery.data?.currentUser?.fullName}
							</span>
							<span className="mobile-header-menu-profile-info-email">
								{currentUserQuery.data?.currentUser?.email}
							</span>
						</div>
						<Link
							className="mobile-header-menu-profile-link"
							onClick={onSomeClick()}
							to="/profile"
						>
							Profile
						</Link>
						<div className="mobile-header-menu-profile-buttons">
							<Button.Transparent
								className="mobile-header-menu-profile-buttons-edit-profile"
								onClick={onSomeClick(() =>
									history.push("/edit-profile")
								)}
								value="Edit profile"
							/>
							<Button.Transparent
								className="mobile-header-menu-profile-buttons-logout"
								onClick={() => { }}
								value="Logout"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MobileHeaderMenu;
