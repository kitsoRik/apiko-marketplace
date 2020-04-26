import React from 'react';

import "./MartiniqueButton.scss";

const MartiniqueButton = ({ className, value, disabled, ...props }) => {
    return (
        <button
            className={`button-martinique ${className ?? ""}`}
            disabled={disabled ? "true" : null}
            {...props}
        >
            {value}
        </button>
    )
};

export default MartiniqueButton;