import React from 'react';

import logo from '../../../assets/icons/apiko-logo.svg';
import heart from '../../../assets/icons/heart.svg';
import './Header.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { thisHost } from '../../../services/api/api';

const Header = (props) => {
    console.log(props);
    return ( 
        <header className="header">
            <Link to="/">
                <img 
                    className="header__apiko-logo" 
                    src={logo} />
            </Link>

            <div className="header__buttons">
                <Button>Sell</Button>
                <Button type="transparent">
                    <Link to="/login">Login</Link>
                </Button>
                <img src={heart}/>
            </div>
        </header>
     );
}

export default Header;