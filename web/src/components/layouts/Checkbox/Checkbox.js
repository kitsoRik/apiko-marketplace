import React from 'react';
import Label from '../Label';


import './Checkbox.scss';

const Checkbox = ({ value, checked = false, className, ...props }) => {
    return (
        <div className={`checkbox ${className}`}>
            <input checked={checked} className="checkbox-input" type="checkbox" {...props} />
            <Label className="checkbox-label" value={value} />
        </div>
    );
}

export default Checkbox;