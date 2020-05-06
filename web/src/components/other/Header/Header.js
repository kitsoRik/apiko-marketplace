import React, { useState } from 'react';

import './Header.scss';
import { Link, useHistory } from 'react-router-dom';
import ApikoLogo from '../ApikoLogo/ApikoLogo';
import PostboxIcon from '../../icons/PostboxIcon/PostboxIcon';
import { NOT_LOGINED, LOGINED, LOGINING, UNLOGINING } from '../../../constants/login';
import UserPanel from './UserPanel/UserPanel';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import HeartIcon from '../../icons/HeartIcon';
import Button from '../../layouts/Button';
import UserIcon from '../../icons/UserIcon';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../apollo/queries/user-queries';
import HeaderSearchPanel from './HeaderSearchPanel/';


const Header = () => {
    const history = useHistory();
    const darkMode = !['/login', '/register'].find((p) => p === history.location.pathname);
    const minorPanel = !!['/', '/profile', '/saved-items'].find(p => p.startsWith(history.location.pathname)) || history.location.pathname.startsWith("/products");

    const [userPanelOpen, setUserPanelOpen] = useState(false);

    const currentUserQuery = useQuery(CURRENT_USER_QUERY);
    const loginStatus = LOGINED; //FIX IT
    const visibleLoginButton = !currentUserQuery.loading && !currentUserQuery.data?.currentUser;
    const visibleUserIcon = !currentUserQuery.loading && currentUserQuery.data.currentUser;
    const visibleUserIconLoading = currentUserQuery.loading || loginStatus === LOGINING || loginStatus === UNLOGINING;

    return (
        <div className="header-wrapper" dark-mode={darkMode ? "true" : null}>
            <header className="header">
                <Link to="/">
                    <ApikoLogo darkMode={darkMode} className="header__apiko-logo" />
                </Link>
                <div></div>
                {loginStatus === LOGINED ? <PostboxIcon onClick={() => history.push("/chats")} /> : <div></div>}

                <Button.Default
                    className="header-sell-button"
                    value="Sell"
                    onClick={() => history.push("/add-product")} />

                {visibleLoginButton &&
                    <Button.Transparent
                        className="header-login-button"
                        darkMode={darkMode ? "true" : null}
                        value="Login"
                        onClick={() => history.push("/login")} />
                }

                {(visibleUserIcon || visibleUserIconLoading) &&
                    <div
                        className="header-profile"
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

                <HeartIcon filed={history.location.pathname === "/saved-items"} color="#fff" onClick={() => history.push("/saved-items")} className="header-heart" dark-mode={darkMode ? "true" : null} width="24" height="24" />

                {minorPanel &&
                    <div className="header-minor-panel">
                        <HeaderSearchPanel />
                    </div>
                }
            </header>
        </div>
    );
}

export default (Header);