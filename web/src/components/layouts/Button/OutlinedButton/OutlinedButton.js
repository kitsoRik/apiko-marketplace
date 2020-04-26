import React from 'react';

import "./OutlinedButton.scss";

const OutlinedButton = ({ className, value, ...props }) => {
    return (
        <button className={`button-outlined ${className ?? ""}`} {...props} >
            {value}
        </button>
    )
};

export default OutlinedButton;