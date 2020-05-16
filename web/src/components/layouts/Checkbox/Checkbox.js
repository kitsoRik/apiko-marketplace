import React from 'react';
import Label from '../Label';


import './Checkbox.scss';

const Checkbox = ({ value, onValueChange = () => { }, checked = false, className, ...props }) => {

    const onChange = (e) => {
        onValueChange(e.target.checked);
    }

    return (
        <div className={`checkbox ${className}`}>
            <input checked={checked} onChange={onChange} className="checkbox-input" type="checkbox" {...props} />
            <Label className="checkbox-label" value={value} />
        </div>
    );
}

export default Checkbox;