import React from 'react';

import "./MenuItem.scss";

const MenuItem = ({ value = "", icon, _close, onAccept = () => { }, ...props }) => {

    const onClick = () => {
        onAccept();
        _close();
    }

    return (
        <div className="menu-item" onClick={onClick} {...props}>
            {icon}
            <span>{value}</span>
        </div>
    )
};

export default MenuItem;