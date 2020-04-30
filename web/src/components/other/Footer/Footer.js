import React from 'react';

import './Footer.scss';

import { useHistory } from 'react-router-dom'

const Footer = () => {

    const { location: { pathname } } = useHistory();

    switch (pathname) {
        case '/add-product':
        case '/edit-profile':
            return null;
        default: break;
    }

    return (
        <footer>
            Copyright (c) 2020. Privacy Policy
        </footer>
    );
}

export default Footer;