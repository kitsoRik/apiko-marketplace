import React from 'react';

import "./DefaultButton.scss";
import { Link } from 'react-router-dom';
import AsComponent from 'react-as-component';

const DefaultButton = ({ asLink = false, className, style, value, disabled, uppercase, ...props }) => {
    return (
        <AsComponent
            as={asLink ? Link : 'button'}
            className={`button-default ${className ?? ""}`}
            style={{
                textTransform: uppercase ? "uppercase" : "none",
                ...style,
            }}
            disabled={disabled ? true : null}
            {...props}
        >
            {value}
        </AsComponent>
    )
};

export default DefaultButton;