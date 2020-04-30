import React from 'react';

import './UserIcon.scss';
import { userIconBaseUrl } from '../../../services/api/api';

const UserIcon = ({ src, fullName = "", className, local = false, ...props }) => {

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
            <img src={`${local ? "" : userIconBaseUrl}${src}`} alt="User icon" />
        </div>
    );
}

export default UserIcon;