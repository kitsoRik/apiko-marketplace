import React, { useState } from 'react';

import "./Label.scss";

const Label = ({ value, AsComponent, error, errorValueIfTouched, className, children, ...props }) => {

    const [touched, setTouched] = useState(false);

    if(!children) {
        if(AsComponent) 
            return <AsComponent 
                        className={`label-solo-value ${className}`} 
                        error={error ? "true" : "false"}
                    >{ value }</AsComponent>
        return <span 
            className={`label-solo-value ${className}`}
            error={error ? "true" : "false"}
            >{ value }</span>;
    }

    return ( 
        <div className={`label ${className}`} {...props} onBlur={() => setTouched(true)}>
            <div className="label-values">
                <span className="label-values-value">{ value }</span>
                {(touched || error) && <span className="label-values-error-value">{ error || errorValueIfTouched }</span>}
            </div>
            { children }
        </div>
     );
}

export default Label;