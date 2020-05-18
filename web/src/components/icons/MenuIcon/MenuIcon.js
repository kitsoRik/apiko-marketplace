import React from 'react';

import "./MenuIcon.scss";

const MenuIcon = ({ ...props }) => {
    return (
        <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3.77407C3.1 3.77407 4 2.9249 4 1.88704C4 0.849166 3.1 0 2 0C0.9 0 0 0.849166 0 1.88704C0 2.9249 0.9 3.77407 2 3.77407ZM2 5.66111C0.9 5.66111 0 6.51028 0 7.54815C0 8.58601 0.9 9.43518 2 9.43518C3.1 9.43518 4 8.58601 4 7.54815C4 6.51028 3.1 5.66111 2 5.66111ZM0 13.2093C0 12.1714 0.9 11.3222 2 11.3222C3.1 11.3222 4 12.1714 4 13.2093C4 14.2471 3.1 15.0963 2 15.0963C0.9 15.0963 0 14.2471 0 13.2093Z" fill="#97A3B4" />
        </svg>

    )
};

export default MenuIcon;