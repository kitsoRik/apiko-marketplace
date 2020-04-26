import React from 'react';

import "./DefaultButton.scss";

const DefaultButton = ({ className, style, value, disabled, ...props }) => {
    return (
        <button
            className={`button-default ${className ?? ""}`}
            style={style}
            disabled={disabled ? true : null}
            {...props}
        >
            {value}
        </button>
    )
};

export default DefaultButton;