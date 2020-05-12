import React from 'react';

import './UserIcon.scss';
import { userIconBaseUrl } from '../../../services/api/api';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';

const UserIcon = ({ src, fullName = "", className, local = false, loading, ...props }) => {

    const initials = fullName.split(" ").map(s => s[0]);

    if (!src) {
        return (
            <div className={`user-icon ${className ?? ""}`} {...props}>
                <span style={{ background: "orange", color: "black" }}>
                    {initials}
                </span>
                {loading && <ModalLoading darken={false} />}
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