import React from 'react';

import "./OutlinedButton.scss";

const OutlinedButton = ({ className, style, value, ...props }) => {
    return (
        <button className={`button-outlined ${className ?? ""}`} style={style} { ...props } >
            { value }
        </button>
    )
};

export default OutlinedButton;