import React, { useState } from 'react';

import "./MobileHeader.scss";
import Button from '../../../layouts/Button';
import { Link, useHistory } from 'react-router-dom';
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
import BurgerIcon from '../../../icons/BurgerIcon/BurgerIcon';
import MobileHeaderMenu from './MobileHeaderMenu/MobileHeaderMenu';

const MobileHeader = () => {
    const history = useHistory();
    const darkMode = !['/login', '/register'].find((p) => p === history.location.pathname);
    const minorPanel = !!['/', '/profile', '/saved-items'].find(p => p.startsWith(history.location.pathname)) || history.location.pathname.startsWith("/products");

    const [userPanelOpen, setUserPanelOpen] = useState(false);


    const [visibleMenu, setVisibleMenu] = useState(false);

    return (
        <header className="mobile-header">
            <Link to="/">
                <ApikoLogo darkMode={darkMode} className="header__apiko-logo" />
            </Link>
            <button className="mobile-header-burger" onClick={() => setVisibleMenu(!visibleMenu)}>
                <BurgerIcon />
            </button>
            {minorPanel &&
                <div className="desktop-header-minor-panel">
                    <HeaderSearchPanel />
                </div>
            }

            {visibleMenu && <MobileHeaderMenu onClose={() => setVisibleMenu(false)} />}
        </header>
    )
};

export default MobileHeader;