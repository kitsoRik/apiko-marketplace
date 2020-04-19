import React from 'react';

import "./Icon.scss";

const Icon = ({ children, ...props }) => {
    return ( 
        <div className="icon" {...props}>
            { children }
        </div>
     );
}

export default Icon;