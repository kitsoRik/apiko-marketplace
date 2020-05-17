import React, { useState } from 'react';

import "./DesktopHeader.scss";
import Button from '../../../layouts/Button';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ApikoLogo from '../../ApikoLogo/ApikoLogo';
import UserIcon from '../../../icons/UserIcon';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';
import HeartIcon from '../../../icons/HeartIcon';
import HeaderSearchPanel from '../HeaderSearchPanel';
import { LOGINING, UNLOGINING, LOGINED } from '../../../../constants/login';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../../apollo/queries/user-queries';
import PostboxIcon from '../../../icons/PostboxIcon/PostboxIcon';
import UserPanel from '../UserPanel/UserPanel';
import CartIcon from '../../../icons/CartIcon/CartIcon';
import PurchaseIcon from '../../../icons/PurchaseIcon/PurchaseIcon';

const DesktopHeader = () => {
    const history = useHistory();
    const location = useLocation();
    const darkMode = !['/login', '/register'].find((p) => p === location.pathname);
    const minorPanel = !!['/', '/profile', '/saved-items'].find(p => p === location.pathname) || location.pathname.startsWith("/products");

    const [userPanelOpen, setUserPanelOpen] = useState(false);

    const currentUserQuery = useQuery(CURRENT_USER_QUERY);
    const loginStatus = LOGINED; //FIX IT
    const visibleLoginButton = !currentUserQuery.loading && !currentUserQuery.data?.currentUser;
    const visibleUserIcon = !currentUserQuery.loading && currentUserQuery.data.currentUser;
    const visibleUserIconLoading = currentUserQuery.loading || loginStatus === LOGINING || loginStatus === UNLOGINING;

    return (
        <header className="desktop-header">
            <Link to="/" >
                <ApikoLogo darkMode={darkMode} className="header__apiko-logo" />
            </Link>
            <div></div>
            {
                loginStatus === LOGINED ? <div className="desktop-header-icons">
                    <PostboxIcon onClick={() => history.push("/chats")} />
                    <CartIcon onClick={() => history.push("/cart")} />
                    <PurchaseIcon onClick={() => history.push("/purchases")} />
                </div> : <div></div>
            }

            <Button.Default
                className="desktop-header-sell-button"
                value="Sell"
                onClick={() => history.push("/add-product")} />

            {
                visibleLoginButton &&
                <Button.Transparent
                    className="desktop-header-login-button"
                    darkMode={darkMode ? "true" : null}
                    value="Login"
                    onClick={() => history.push("/login")} />
            }

            {
                (visibleUserIcon || visibleUserIconLoading) &&
                <div
                    className="desktop-header-profile"
                    tabIndex={1}
                    onBlur={() => setTimeout(() => setUserPanelOpen(false), 100)}>
                    {visibleUserIcon &&
                        <UserIcon
                            src={currentUserQuery.data.currentUser.iconName}
                            fullName={currentUserQuery.data.currentUser.fullName}
                            onClick={() => setUserPanelOpen(!userPanelOpen)} />}
                    {userPanelOpen && <UserPanel />}
                    {visibleUserIconLoading && <ModalLoading style={{ height: `48px`, width: `48px`, borderRadius: `50%` }} />}
                </div>
            }

            <HeartIcon filed={history.location.pathname === "/saved-items"} color="#fff" onClick={() => history.push("/saved-items")} className="desktop-header-heart" dark-mode={darkMode ? "true" : null} width="24" height="24" />

            {
                minorPanel &&
                <div className="desktop-header-minor-panel">
                    <HeaderSearchPanel />
                </div>
            }
        </header >
    )
};

export default DesktopHeader;