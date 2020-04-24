import React from 'react';

import "./MartiniqueButton.scss";

const MartiniqueButton = ({ className, style, value, disabled, ...props }) => {
    return (
        <button
            className={`button-martinique ${className ?? ""}`}
            style={style}
            disabled={disabled ? "true" : null}
            { ...props }
            >
          { value }
        </button>
    )
};

export default MartiniqueButton;