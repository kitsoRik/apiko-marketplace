import React, { useState, useEffect } from 'react';

import './Header.scss';
import { Link, useHistory } from 'react-router-dom';
import ApikoLogo from '../ApikoLogo/ApikoLogo';
import PostboxIcon from '../../icons/PostboxIcon/PostboxIcon';
import { NOT_LOGINED, UNLOGINED, LOGINED, LOGINING, UNLOGINING } from '../../../constants/login';
import { LOADING, LOADED } from '../../../constants';
import UserPanel from './UserPanel/UserPanel';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import HeartIcon from '../../icons/HeartIcon';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Button from '../../layouts/Button';
import UserIcon from '../../icons/UserIcon';


const Header = ({ loginStatus, loadingDataState, fullName, iconName }) => {
    const history = useHistory();
    let darkMode = !['/login', '/register'].find((p) => p === history.location.pathname);

    const [minorPanel, setMinorPanel] = useState();

    const [userPanelOpen, setUserPanelOpen] = useState(false);

    useEffect(() => {
        setHeaderMinorPanel = setMinorPanel;
        return () => setHeaderMinorPanel = null;
    }, []);

    let ref = React.createRef();

    return (
        <div className="header-wrapper" dark-mode={darkMode ? "true" : null}>
            <header className="header">
                <Link to="/">
                    <ApikoLogo darkMode={darkMode} className="header__apiko-logo" />
                </Link>
                <div></div>
                {loginStatus === LOGINED ? <PostboxIcon /> : <div></div>}

                <Button.Default className="header-sell-button" value="Sell" />

                {((loginStatus === NOT_LOGINED || loginStatus === UNLOGINED) && loadingDataState !== LOADING) &&
                    <Button.Transparent
                        className="header-login-button"
                        darkMode={darkMode ? "true" : null}
                        value="Login"
                        onClick={() => history.push("/login")} />
                }

                {(loadingDataState === LOADING || loginStatus === LOGINED || loginStatus === LOGINING || loginStatus === UNLOGINING) &&
                    <div
                        className="header-profile"
                        tabIndex={1}
                        onBlur={() => setTimeout(() => setUserPanelOpen(false), 100)}>
                        {loginStatus === LOGINED && loadingDataState === LOADED &&
                            <UserIcon
                                src={iconName}
                                fullName={fullName}
                                onClick={() => setUserPanelOpen(!userPanelOpen)} />}
                        {userPanelOpen && <UserPanel />}
                        {(loginStatus === LOGINING || loadingDataState === LOADING || loginStatus === UNLOGINING) &&
                            <ModalLoading style={{ height: `48px`, width: `48px`, borderRadius: `50%` }} />}
                    </div>
                }

                <HeartIcon className="header-heart" dark-mode={darkMode ? "true" : null} width="24" height="24" />

                {minorPanel &&
                    <div className="header-minor-panel">
                        {minorPanel}
                    </div>
                }
            </header>
        </div>
    );
}

export let setHeaderMinorPanel = (panel) => { }

export default compose(
    connect(({ user: { loginStatus, loadingDataState, data: { fullName, iconName } } }) => ({ loginStatus, loadingDataState, fullName, iconName }))
)(Header);