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
import withScreenSize from '../../hocs/withScreenSize/withScreenSize';
import DesktopHeader from './DesktopHeader/DesktopHeader';
import MobileHeader from './MobileHeader/MobileHeader';


const Header = ({ screenSize }) => {

    const history = useHistory();
    const darkMode = !['/login', '/register'].find((p) => p === history.location.pathname);


    return (
        <div className="header-wrapper" dark-mode={darkMode ? "true" : null}>
            {screenSize.width > 480 && <DesktopHeader />}
            {screenSize.width <= 480 && <MobileHeader />}
        </div>
    );
}

export default withScreenSize(Header);