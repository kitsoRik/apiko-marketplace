import React from 'react';

import "./MobileHeaderMenu.scss";
import { LOGINING, UNLOGINING, LOGINED } from '../../../../../constants/login';
import { CURRENT_USER_QUERY } from '../../../../../apollo/queries/user-queries';
import { useQuery } from '@apollo/react-hooks';
import Button from '../../../../layouts/Button';
import { useHistory, Link } from 'react-router-dom';
import ModalLoading from '../../../../layouts/ModalLoading/ModalLoading';
import UserPanel from '../../UserPanel/UserPanel';
import UserIcon from '../../../../icons/UserIcon';

const MobileHeaderMenu = () => {
    const history = useHistory();
    const darkMode = !['/login', '/register'].find((p) => p === history.location.pathname);
    const currentUserQuery = useQuery(CURRENT_USER_QUERY);
    const loginStatus = LOGINED; //FIX IT
    const visibleLoginButton = !currentUserQuery.loading && !currentUserQuery.data?.currentUser;
    const visibleUserIcon = !currentUserQuery.loading && currentUserQuery.data.currentUser;
    const visibleUserIconLoading = currentUserQuery.loading || loginStatus === LOGINING || loginStatus === UNLOGINING;

    return (
        <div className="mobile-header-menu">

            <Button.Default
                className="desktop-header-sell-button"
                value="Sell"
                onClick={() => history.push("/add-product")} />

            {visibleLoginButton &&
                <Button.Transparent
                    className="desktop-header-login-button"
                    darkMode={darkMode ? "true" : null}
                    value="Login"
                    onClick={() => history.push("/login")} />
            }
            <div>
                {visibleUserIconLoading &&
                    <div
                        className="desktop-header-profile"
                        tabIndex={1}>

                        {visibleUserIconLoading && <ModalLoading style={{ height: `48px`, width: `48px`, borderRadius: `50%` }} />}
                    </div>
                }
                {visibleUserIcon &&
                    <div>
                        <div className="user-panel-upper">
                            <UserIcon fullName={currentUserQuery.data?.currentUser?.fullName} src={currentUserQuery.data?.currentUser?.iconName} />
                            <div className="user-panel-upper-info">
                                <span className="user-panel-upper-info-name">{currentUserQuery.data?.currentUser?.fullName}</span>
                                <span className="user-panel-upper-info-email">{currentUserQuery.data?.currentUser?.email}</span>
                                <Link className="user-panel-upper-info-profile-button" to="/profile">
                                    Profile
                        </Link>
                            </div>
                        </div>
                        <Button.Default
                            className="user-panel-edit-profile-button"
                            onClick={() => history.push("/edit-profile")} value="Edit profile" />
                        <Button.Default
                            className="user-panel-logout-button"
                            onClick={() => { }} value="Logout" />
                    </div>
                }
            </div>
        </div>
    )
};

export default MobileHeaderMenu;