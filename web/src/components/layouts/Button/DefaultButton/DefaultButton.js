import React from 'react';

import "./DefaultButton.scss";

const DefaultButton = ({ className, style, value, disabled, uppercase, ...props }) => {
    return (
        <button
            className={`button-default ${className ?? ""}`}
            style={{
                textTransform: uppercase ? "uppercase" : "none",
                ...style,
            }}
            disabled={disabled ? true : null}
            {...props}
        >
            {value}
        </button>
    )
};

export default DefaultButton;