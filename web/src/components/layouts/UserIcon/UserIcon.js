import React from 'react';

import './UserIcon.scss';

const UserIcon = ({ src, fullName = "", className, ...props }) => {

    const initials = fullName.split(" ").map(s => s[0]);

    if(!src) {
        return (
            <div className={`user-icon ${className ?? ""}`} {...props}>
                <span style={{ background: "orange", color: "black" }}>
                    { initials }
                </span>
            </div>
        )
    }

    return ( 
        <div className="user-icon" {...props}>
            <img src={src} />
        </div>
     );
}

export default UserIcon;