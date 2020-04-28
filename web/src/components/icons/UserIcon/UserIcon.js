import React from 'react';

import './UserIcon.scss';

const UserIcon = ({ src, fullName = "", className, ...props }) => {

    const initials = fullName.split(" ").map(s => s[0]);

    if (!src) {
        return (
            <div className={`user-icon ${className ?? ""}`} {...props}>
                <span style={{ background: "orange", color: "black" }}>
                    {initials}
                </span>
            </div>
        )
    }

    return (
        <div className={`user-icon ${className ?? ""}`} {...props}>
            <img src={`http://5.45.118.116:3500/static/icons/users/${src}`} alt="User icon" />
        </div>
    );
}

export default UserIcon;