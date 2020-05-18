import React, { useState } from 'react';

import "./Menu.scss";
import MenuIcon from '../../icons/MenuIcon/MenuIcon';
import MenuItem from './MenuItem';
import Form from '../Form/Form';
import OutsideClickHandler from 'react-outside-click-handler';


const Menu = ({ children, handleClickOutside }) => {
    const [open, setOpen] = useState(false);

    const chs = children ? Array.isArray(children) ? children : [children] : [];
    const items = chs.filter(c => c.type === MenuItem)
        .map((c, i) => React.cloneElement(c, {
            _close: () => setOpen(false),
            key: i
        }));


    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className="menu">
                <MenuIcon onClick={() => setOpen(!open)} />
                {open && <Form className="menu-form">
                    {items}
                </Form>}
            </div>
        </OutsideClickHandler>
    )
};

export default Menu;