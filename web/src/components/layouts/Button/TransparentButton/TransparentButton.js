import React from 'react';

import "./TransparentButton.scss";

const TransparentButton = ({ className, value, disabled, ...props}) => {
    return (
        <button className={`button-transparent ${className ?? ""}`}  disabled={disabled ? "true" : null} { ...props }>
          { value }
        </button>
    )
};

export default TransparentButton;