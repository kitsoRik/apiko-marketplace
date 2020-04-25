import React, { useState } from 'react';

import "./Label.scss";

const Label = ({ value, as = "span", error, errorValueIfTouched, className, children, ...props }) => {

    const [touched, setTouched] = useState(false);

    if(!children) {
        return textToComponent(as, { 
            className: `label-solo-value ${className}`, error: error ? "true" : "false", ...props 
        }, value);
    }

    return ( 
        <div className={`label ${className}`} {...props} onBlur={() => setTouched(true)}>
            <div className="label-values">
                {
                    textToComponent(as, { 
                        className: `label-values-value ${className}`, error: error ? "true" : "false", ...props 
                    }, value)
                }
                {(touched || error) && <span className="label-values-error-value">{ error || errorValueIfTouched }</span>}
            </div>
            { children }
        </div>
     );
}

const textToComponent = (as, props = null, content = "") => React.createElement(as, props, content);

export default Label;