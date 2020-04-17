import React from 'react';

import "./Button.scss";

const Button = ({ className, type = "default", children, ...props }) => {

    let typeClassName = "";

    switch(type) {
        case "transparent": {
            typeClassName = "button-transparent";
            break;
        }
        case "martinique": {
            typeClassName = "button-martinique";
            break;
        }
        case "default":
        default: {
            typeClassName = "button-default";
        }
    }

    return ( 
        <button className={`button ${typeClassName} ${className}`} { ...props }>
            { children }
        </button>
     );
}

export default Button;