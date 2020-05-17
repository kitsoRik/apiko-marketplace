import React from 'react';

import './Footer.scss';

import { useHistory, useLocation } from 'react-router-dom'

const Footer = () => {

    const { pathname } = useLocation();

    switch (pathname) {
        case '/add-product':
        case '/edit-profile':
        case '/chats':
            return null;
        default: break;
    }

    if (pathname.startsWith("/chats")) return null;

    return (
        <footer>
            Copyright (c) 2020. Privacy Policy
        </footer>
    );
}

export default Footer;