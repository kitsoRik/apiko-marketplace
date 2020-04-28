import React from 'react';

import "./MartiniqueButton.scss";

const MartiniqueButton = ({ className, value, disabled = false, ...props }) => {
    return (
        <button
            className={`button-martinique ${className ?? ""}`}
            disabled={disabled}
            {...props}
        >
            {value}
        </button>
    )
};

export default MartiniqueButton;